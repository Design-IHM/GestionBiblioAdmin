// services/archiveService.ts
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { ArchiveItem, ArchivesData, ArchiveStats } from '../types/archives';

export class ArchiveService {
  private archiveCollection = collection(db, 'ArchivesBiblio');

  // Méthode pour convertir les données Firestore (similaire à reservationService)
  private convertFirestoreData(data: any): any {
    if (data === null || data === undefined) return data;
    
    if (data instanceof Timestamp) {
      return data.toDate().toISOString();
    }

    if (Array.isArray(data)) {
      return data.map(item => this.convertFirestoreData(item));
    }

    if (typeof data === 'object') {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => 
          [key, this.convertFirestoreData(value)]
        )
      );
    }

    return data;
  }

  // Récupérer toutes les archives
  async getArchives(): Promise<ArchiveItem[]> {
    try {
      const snapshot = await getDocs(this.archiveCollection);
      const items: ArchiveItem[] = [];
      
      snapshot.forEach((doc) => {
        const rawData = doc.data();
        // Convertir toutes les données Firestore (y compris les Timestamp)
        const convertedData = this.convertFirestoreData(rawData) as ArchivesData;
        
        items.push(...convertedData.tableauArchives.map(item => ({
          ...item,
          id: doc.id // Ajouter l'ID du document
        })));
      });

      return items;
    } catch (error) {
      console.error('Error fetching archives:', error);
      throw new Error('Failed to fetch archives');
    }
  }

  // Récupérer les statistiques des archives
  async getArchiveStatistics(): Promise<ArchiveStats> {
    try {
      const archives = await this.getArchives();
      const sorted = [...archives].sort((a, b) => 
        new Date(b.heure).getTime() - new Date(a.heure).getTime()
      );

      return {
        totalArchives: archives.length,
        lastArchiveDate: sorted[0]?.heure || null
      };
    } catch (error) {
      console.error('Error calculating archive statistics:', error);
      return { 
        totalArchives: 0, 
        lastArchiveDate: null 
      };
    }
  }

  // Méthode pour s'abonner aux mises à jour en temps réel (optionnel)
  subscribeToArchives(callback: (items: ArchiveItem[]) => void): () => void {
    const unsubscribe = onSnapshot(this.archiveCollection, (snapshot) => {
      const items: ArchiveItem[] = [];
      snapshot.forEach((doc) => {
        const convertedData = this.convertFirestoreData(doc.data()) as ArchivesData;
        items.push(...convertedData.tableauArchives.map(item => ({
          ...item,
          id: doc.id
        })));
      });
      callback(items);
    });

    return unsubscribe;
  }
}

export const archiveService = new ArchiveService();