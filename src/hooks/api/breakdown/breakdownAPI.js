import axios from 'axios';

/**수입 데이터 GET */
export const fetchIncomeData = async (baseUrl, accessToken, month) => {
  const response = await axios.get(`${baseUrl}/transactions/deposits`, {
    params: {
      monthValue: month,
    },
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
  });
  return response.data.data;
};

/**지출 데이터 GET */
export const fetchSpendingData = async (baseUrl, accessToken, month) => {
  const response = await axios.get(`${baseUrl}/transactions/expenses`, {
    params: {
      monthValue: month,
    },
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${accessToken}`,
    },
  });
  return response.data.data;
};
