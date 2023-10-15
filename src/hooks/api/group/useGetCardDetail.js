import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getGroupCardDetail = async (financeId, year, month) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  return await axios.get(`${baseUrl}/group/financeService`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
    params: {
      financeId: financeId,
      yearValue: year,
      monthValue: month,
    },
  });
};

export const useGetGroupCardDetail = (financeId, year, month) => {
  const { data, isError, isLoading } = useQuery(
    ['groupCardDetail', year, month],
    () => getGroupCardDetail(financeId, year, month),
  );

  return { data: data?.data, isError, isLoading };
};
