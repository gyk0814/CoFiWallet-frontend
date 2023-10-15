import { useQuery } from '@tanstack/react-query';
import { fetchFinancialData } from './mainAPI';

const useFinancialData = month => {
  return useQuery({
    queryFn: () => fetchFinancialData(month),
    queryKey: ['financialData', month],
    staleTime: 1000 * 60 * 10,
  });
};

export default useFinancialData;
