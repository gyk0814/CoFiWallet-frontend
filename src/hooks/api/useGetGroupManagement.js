import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getGroupInfos = async () => {
  // const baseUrl = process.env.REACT_APP_BASE_URL;

  return await axios.get('https://jsonplaceholder.typicode.com/posts/1');
};

export const useGetGroupManagement = () => {
  const { data, isError, isLoading } = useQuery(['groupInfos'], getGroupInfos);

  return { data: data?.data, isError, isLoading };
};
