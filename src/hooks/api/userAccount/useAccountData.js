import { useQuery } from '@tanstack/react-query';
import { fetchAccountData } from './account';

export const useAccountData = () => {
  return useQuery({
    queryFn: fetchAccountData,
    queryKey: ['accountData'],
  });
};
