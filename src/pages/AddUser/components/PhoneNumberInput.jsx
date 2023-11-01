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
        if (message === 'Invitation sent and member added') {
          alert('Shared management setup is complete.');
          closeModal();
          navigate('/group');
        } else if (message === 'Exceeds maximum member count: 5') {
          alert('Exceeds the maximum member count: 5');
        } else if (message === 'Phone number not found') {
          alert('Phone number not found.');
        } else if (message === 'Same group') {
          alert('This group is already registered.');
        }
      },
      onError: () => {
        alert('An error occurred.');
      },
    },
  );

  const handlePostPhoneNumber = () => {
    if (phoneNumberIsValid) {
      addUserMutation.mutate(userPhoneNumber);
    } else {
      alert('Invalid phone number.');
    }
  };

  return (
    <div className="phoneNumberInputContainer">
      <DefaultInput
        icon={<CiUser className="inputIcon" />}
        type="text"
        placeholder="Phone number"
        id="phoneNumber"
        value={userPhoneNumber}
        onChange={handleInputChange}
      />
      <DefaultButton
        text="Next"
        onClick={handlePostPhoneNumber}
        disabled={!phoneNumberIsValid}
      />
    </div>
  );
};

export default PhoneNumberInput;
