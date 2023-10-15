import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const signupUser = userInfo => {
  return axios.post(`${baseUrl}/user/signup`, userInfo, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
};

export const authenticateUser = async phoneNumber => {
  const response = await axios.post(
    `${baseUrl}/user/CI`,
    { phoneNumber },
    {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    },
  );
  return response.data;
};
