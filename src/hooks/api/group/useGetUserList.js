import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getGroupUserList = async () => {
  // const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  // return await axios.get(`${baseUrl}/group`, {
  return await axios.get('/data/userData.json', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
  });
};

export const useGetGroupUserList = () => {
  const { data, isError, isLoading } = useQuery(
    ['groupUsers'],
    getGroupUserList,
  );

  return { data: data?.data.data, isError, isLoading };
};
