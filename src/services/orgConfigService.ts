import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type {OrgSettings} from "../types/OrgSettings.ts";
import { defaultOrgSettings } from '../constants/defaultOrgSettings';

export const fetchOrgConfiguration = async (orgName: string): Promise<OrgSettings> => {
	try {
		const docRef = doc(db, 'Configurations', orgName);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const data = docSnap.data() as OrgSettings;
			// Merge with defaults to ensure all fields exist
			return mergeWithDefaults(data);
		} else {
			console.log('No configuration found, using defaults');
			return defaultOrgSettings;
		}
	} catch (error) {
		console.error('Error fetching organization configuration:', error);
		return defaultOrgSettings;
	}
};

const mergeWithDefaults = (data: Partial<OrgSettings>): OrgSettings => {
	return {
		...defaultOrgSettings,
		...data,
		Contact: {
			...defaultOrgSettings.Contact,
			...(data.Contact || {})
		},
		OpeningHours: {
			...defaultOrgSettings.OpeningHours,
			...(data.OpeningHours || {})
		},
		Theme: {
			...defaultOrgSettings.Theme,
			...(data.Theme || {})
		}
	};
};
