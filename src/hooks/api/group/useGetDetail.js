import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getGroupAssetDetail = async financeId => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  return await axios.get(`${baseUrl}/group/finance/detail`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
    params: {
      financeId: financeId,
    },
  });
};

export const useGetGroupAssetDetail = financeId => {
  const { data, isError, isLoading } = useQuery(['groupAssetDetail'], () =>
    getGroupAssetDetail(financeId),
  );

  return { data: data?.data.data[0], isError, isLoading };
};
