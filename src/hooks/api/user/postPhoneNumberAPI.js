import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const postPhoneNumber = async phoneNumber => {
  const response = await axios.post(
    `${baseUrl}/user/presignin`,
    { phoneNumber },
    {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    },
  );

  return response.data;
};

export default postPhoneNumber;
