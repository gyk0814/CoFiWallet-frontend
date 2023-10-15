import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getProfileImage = async () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  return await axios.get(baseUrl);
};

export const useGetProfileImage = () => {
  const { data, isError, isLoading } = useQuery(
    ['profileImage'],
    getProfileImage,
  );

  return { data: data?.data, isError, isLoading };
};
