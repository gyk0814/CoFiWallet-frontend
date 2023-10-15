import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const signIn = ({ phoneNumber, password }) => {
  return axios.post(`${baseUrl}/user/signin`, { phoneNumber, password });
};

export default signIn;
