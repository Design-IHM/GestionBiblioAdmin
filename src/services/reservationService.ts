// services/reservationService.ts
import { collection, doc, updateDoc, query, where, getDocs, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

import { fetchMaximumSimultaneousLoans } from './configService';
import type { ProcessedUserReservation, ReservationSlot, UserReservation } from '../types/reservations';

export class ReservationService {
  private userCollection = collection(db, 'BiblioUser');


  // Nouvelle méthode pour convertir les Timestamp en string ISO
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

  // Récupérer le nombre maximum d'emprunts
  async getMaxLoans(): Promise<number> {
    return await fetchMaximumSimultaneousLoans();
  }

  // Traiter les données utilisateur pour extraire les slots de réservation
  processUserReservationData(userData: UserReservation, maxLoans: number): ProcessedUserReservation {
    const reservationSlots: ReservationSlot[] = [];

    // Parcourir tous les slots possibles selon maxLoans
    for (let i = 1; i <= maxLoans; i++) {
      const etatKey = `etat${i}`;
      const tabKey = `tabEtat${i}`;
      
      const status = userData[etatKey] as 'reserv' | 'emprunt' | 'ras';
      const tabData = userData[tabKey] as [string, string, string, number, string, string];

      if (status === 'reserv' && tabData && Array.isArray(tabData) && tabData[0]) {
        reservationSlots.push({
          slotNumber: i,
          status: 'reserv',
          document: {
            name: tabData[0],
            category: tabData[1],
            imageUrl: tabData[2],
            exemplaires: tabData[3],
            collection: tabData[4],
            reservationDate: tabData[5]
          }
        });
      }
    }
    

    return {
      email: userData.email,
      name: userData.name,
      niveau: userData.niveau,
      matricule: userData.matricule,
      imageUri: userData.imageUri,
      reservationSlots,
      totalActiveReservations: reservationSlots.length
    };
  }

  // Récupérer toutes les réservations actives
  async getActiveReservations(): Promise<ProcessedUserReservation[]> {
    try {
      const maxLoans = await this.getMaxLoans();
      const snapshot = await getDocs(this.userCollection);
      const users: ProcessedUserReservation[] = [];
      
      snapshot.forEach((docSnap) => {
        const userData = { ...docSnap.data(), email: docSnap.id } as UserReservation;
        
        // Vérifier s'il y a des réservations actives dans n'importe quel slot
        let hasActiveReservations = false;
        for (let i = 1; i <= maxLoans; i++) {
          if (userData[`etat${i}`] === 'reserv') {
            hasActiveReservations = true;
            break;
          }
        }
        
        if (hasActiveReservations) {
          const processedUser = this.processUserReservationData(userData, maxLoans);
          users.push(processedUser);
        }
      });
      
      return users;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw new Error('Impossible de récupérer les réservations');
    }
  }

  // Valider une réservation (la transformer en emprunt)
  async validateReservation(
    userEmail: string,
    slot: number,
    documentData: [string, string, string, number, string, string],
    userName: string
  ): Promise<void> {
    try {
      const documentName = documentData[0];
      const collectionName = documentData[4] || 'BiblioInformatique';
      const currentDate = new Date().toISOString();

      // Décrémenter le nombre d'exemplaires du livre
      const docCollection = collection(db, collectionName);
      const docQuery = query(docCollection, where('name', '==', documentName));
      const docSnapshot = await getDocs(docQuery);

      if (!docSnapshot.empty) {
        const docRef = docSnapshot.docs[0].ref;
        const currentExemplaire = docSnapshot.docs[0].data().exemplaire || 0;
        
        await updateDoc(docRef, {
          exemplaire: Math.max(0, currentExemplaire - 1) // Empêcher les valeurs négatives
        });
      }

      // Mettre à jour l'état de l'utilisateur (réservation → emprunt)
      const userRef = doc(this.userCollection, userEmail);
      const updateData: any = {};
      updateData[`etat${slot}`] = 'emprunt';
      updateData[`tabEtat${slot}`] = [
        documentData[0], // nom
        documentData[1], // catégorie
        documentData[2], // image
        documentData[3], // exemplaires
        documentData[4], // collection
        currentDate      // date d'emprunt
      ];

      await updateDoc(userRef, updateData);

    } catch (error) {
      console.error('Erreur lors de la validation de la réservation:', error);
      throw error;
    }
  }

  // Valider une réservation pour un utilisateur traité
  async validateReservationForProcessedUser(user: ProcessedUserReservation, slot: number): Promise<void> {
    const slotData = user.reservationSlots.find(s => s.slotNumber === slot);
    
    if (!slotData || !slotData.document) {
      throw new Error(`Aucune réservation trouvée dans le slot ${slot}`);
    }

    const documentData: [string, string, string, number, string, string] = [
      slotData.document.name,
      slotData.document.category,
      slotData.document.imageUrl,
      slotData.document.exemplaires,
      slotData.document.collection,
      slotData.document.reservationDate
    ];

    return this.validateReservation(user.email, slot, documentData, user.name);
  }

  // Obtenir les statistiques des réservations
  async getReservationStatistics(): Promise<{
    totalActiveReservations: number;
    totalUsers: number;
    averageReservationsPerUser: number;
    maxLoansAllowed: number;
  }> {
    try {
      const maxLoans = await this.getMaxLoans();
      const users = await this.getActiveReservations();
      
      const totalActiveReservations = users.reduce((total, user) => total + user.totalActiveReservations, 0);

      return {
        totalActiveReservations,
        totalUsers: users.length,
        averageReservationsPerUser: users.length > 0 ? totalActiveReservations / users.length : 0,
        maxLoansAllowed: maxLoans
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques de réservations:', error);
      return { totalActiveReservations: 0, totalUsers: 0, averageReservationsPerUser: 0, maxLoansAllowed: 3 };
    }
  }
}

// Instance singleton
export const reservationService = new ReservationService();