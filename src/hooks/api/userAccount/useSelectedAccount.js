import { useQuery } from '@tanstack/react-query';
import { fetchSelectedAccount } from './account';

export const useSelectedAccount = (banks, cards) => {
  return useQuery({
    queryFn: () => fetchSelectedAccount(banks, cards),
    queryKey: ['accountData', banks, cards],
    enabled: !!banks || !!cards,
  });
};
