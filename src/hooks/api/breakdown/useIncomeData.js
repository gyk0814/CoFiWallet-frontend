import { useQuery } from '@tanstack/react-query';
import { fetchIncomeData } from './breakdownAPI';

export const useIncomeData = (baseUrl, accessToken, month) => {
  const {
    data: incomeData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchIncomeData(baseUrl, accessToken, month),
    queryKey: ['incomeData', month],
    staleTime: 0,
  });

  if (isError) {
    console.error(`ERROR : ${error}`);
  }

  return { incomeData, isError, isLoading, error };
};
