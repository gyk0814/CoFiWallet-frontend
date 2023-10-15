import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getCardsAndAccounts = async () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  return await axios.get('/data/cardAndAccountData.json');
};

export const useGetCardsAndAccounts = () => {
  const { data, isError, isLoading } = useQuery(
    ['cardsAndaccounts'],
    getCardsAndAccounts,
  );

  return { data: data?.data.data, isError, isLoading };
};
