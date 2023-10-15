import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem('accessToken');

const getGroupFinanceList = async () => {
  return await axios.get(`${baseUrl}/group/financeList`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: accessToken,
    },
  });
};

export const useGetGroupFinanceList = () => {
  const { data, isError, isLoading } = useQuery(
    ['groupFinanceList'],
    getGroupFinanceList,
  );

  return { data: data?.data.data, isError, isLoading };
};
