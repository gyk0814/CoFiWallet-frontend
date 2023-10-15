import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getGroupMains = async () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  // return await axios.get('/group', {
  const { data } = await axios.get(`${baseUrl}/group`, {
    // return await axios.get('/data/groupMain.json', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
  });
  return data;
};

export const useGetGroupMain = options => {
  return useQuery(['groupMains'], getGroupMains, options);
};

// return { data: data?.data.data[0], isError, isLoading };
