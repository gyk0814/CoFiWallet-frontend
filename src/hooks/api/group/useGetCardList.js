import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getCards = async type => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  return await axios.get(`${baseUrl}/group/finance?type='${type}'`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
  });
};

export const useGetCards = () => {
  const { data, isError, isLoading } = useQuery(['cards'], getCards);

  return { data: data?.data.data, isError, isLoading };
};
