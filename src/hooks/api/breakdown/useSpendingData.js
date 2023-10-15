import { useQuery } from '@tanstack/react-query';
import { fetchSpendingData } from './breakdownAPI';

export const useSpendingData = (baseUrl, accessToken, month) => {
  const {
    data: spendingData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchSpendingData(baseUrl, accessToken, month),
    queryKey: ['spendingData', month],
    staleTime: 0,
  });

  if (isError) {
    console.error(`ERROR : ${error}`);
  }

  return { spendingData, isError, isLoading, error };
};
