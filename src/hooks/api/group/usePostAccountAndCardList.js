import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const postCardsAndAccounts = async selectItems => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  try {
    const response = await axios.post(`${baseUrl}/finance`, {
      selectItems,
    });
  } catch (error) {
    console.log(error);
  }
};

export const usePostCardsAndAccounts = () => {
  const mutation = useMutation(postCardsAndAccounts);

  return mutation;
};
