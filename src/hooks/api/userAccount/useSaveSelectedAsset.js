import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem('accessToken');

const saveSelectedAsset = async list => {
  try {
    const response = await axios.post(
      `${baseUrl}/providers/transactions`,
      list,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
/** 유저가 체크한 계좌만 POST */
const useSaveSelectedAsset = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: saveSelectedAsset,
    onSuccess: data => {
      if (data && data.message === 'SUCCESS CREATED') {
        alert('계좌 연결에 성공했습니다.');
        navigate('/main');
      } else if (data && data.message === 'NO_RECORDS') {
        alert(`계좌 연결에 실패했습니다. Error : ${data.message}`);
      } else {
        alert('console 확인 요망');
      }
    },
  });
};

export default useSaveSelectedAsset;
