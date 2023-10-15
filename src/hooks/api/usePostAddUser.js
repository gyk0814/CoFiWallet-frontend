import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const usePostAddUser = () => {
  const mutation = useMutation({
    mutationFn: userPhoneNumber => {
      return axios.post(`${baseUrl}/invitation`, {
        phoneNumber: userPhoneNumber,
      });
    },
  });

  return mutation;
};
