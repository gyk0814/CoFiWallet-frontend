import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
import { useMutation } from '@tanstack/react-query';
import { phoneNumberPattern } from '../../../utils/constant';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import axios from 'axios';
import './PhoneNumberInput.scss';

const baseUrl = process.env.REACT_APP_BASE_URL;

const PhoneNumberInput = ({ closeModal }) => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const navigate = useNavigate();

  const phoneNumberIsValid = phoneNumberPattern.test(userPhoneNumber);

  const handleInputChange = e => {
    const inputValue = e.target.value;
    let onlyNumber = inputValue.replace(/[^0-9]/g, '');
    if (onlyNumber.length > 11) {
      onlyNumber = onlyNumber.slice(0, 11);
    }
    setUserPhoneNumber(onlyNumber);
  };

  const addUserMutation = useMutation(
    async phoneNumber => {
      const response = await axios.post(
        `${baseUrl}/group/invitation`,
        {
          receiverPhoneNumber: phoneNumber,
        },
        {
          headers: {
            Authorization: localStorage.getItem('accessToken'),
          },
        },
      );
      return response.data;
    },
    {
      onSuccess: data => {
        const { message } = data;
        if (message === 'invitation sent and added member') {
          alert('공동관리 설정이 완료되었습니다.');
          closeModal();
          navigate('/group');
        } else if (message === 'Exceeds maximum member count: 5') {
          alert('최대 회원 수를 초과');
        } else if (message === 'Phone number not found') {
          alert('존재하지 않는 번호입니다.');
        } else if (message === 'same group') {
          alert('이미 등록된 그룹입니다.');
        }
      },
      onError: () => {
        alert('에러가 발생했습니다');
      },
    },
  );

  const handlePostPhoneNumber = () => {
    if (phoneNumberIsValid) {
      addUserMutation.mutate(userPhoneNumber);
    } else {
      alert('유효하지 않은 전화번호입니다');
    }
  };
  return (
    <div className="phoneNumberInputContainer">
      <DefaultInput
        icon={<CiUser className="inputIcon" />}
        type="text"
        placeholder="전화번호"
        id="phoneNumber"
        value={userPhoneNumber}
        onChange={handleInputChange}
      />
      <DefaultButton
        text="다음"
        onClick={handlePostPhoneNumber}
        disabled={!phoneNumberIsValid}
      />
    </div>
  );
};

export default PhoneNumberInput;
