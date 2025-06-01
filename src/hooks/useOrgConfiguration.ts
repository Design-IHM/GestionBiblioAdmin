import {useQuery} from "react-query";
import { fetchOrgConfiguration } from '../services/orgConfigService';

export const useOrgConfiguration = (orgName: string) => {
	return useQuery(
		['orgConfiguration', orgName],
		() => fetchOrgConfiguration(orgName),
		{
			enabled: !!orgName,
			staleTime: 5 * 60 * 1000, // 5 minutes
			cacheTime: 10 * 60 * 1000, // 10 minutes
			refetchOnWindowFocus: false,
		}
	);
};
