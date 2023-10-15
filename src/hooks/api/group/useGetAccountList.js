import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const id = parseInt(localStorage.getItem('id'));

const getGroupAssets = async (type, memberId) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  // return await axios.get(`/data/assetList.json?type=${type}`, {
  return await axios.get(`${baseUrl}/group/finance`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
    params: {
      type: `${type}`,
      memberId: memberId,
    },
  });
};

export const useGetGroupAssets = (type, memberId) => {
  const { data, isError, isLoading } = useQuery(
    ['groupAssets', type, memberId],
    () => {
      if (memberId) {
        return getGroupAssets(type, memberId);
      } else {
        return getGroupAssets(type, null);
      }
    },
    {
      enabled: !!type,
    },
  );

  return { data: data?.data.data, isError, isLoading };
};
