import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem('accessToken');

export const useDeleteGroupUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: id => {
      return axios.delete(`${baseUrl}/group/member/${id}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['groupUsers']);
    },
  });

  return mutation;
};
