import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getGroupUsers = async () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  return await axios.get(`${baseUrl}/group/member`, {
    // return await axios.get('/data/userData.json', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
  });
};

export const useGetGroupUsers = () => {
  const { data, isError, isLoading } = useQuery(['groupUsers'], getGroupUsers);

  return { data: data?.data, isError, isLoading };
};
