import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const postPhoneNumber = async phoneNumber => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(`${baseUrl}/group/invitation`, {
      phoneNumber,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to post phone number');
  }
};

export const usePostPhoneNumber = () => {
  return useMutation(phoneNumber => postPhoneNumber(phoneNumber));
};
