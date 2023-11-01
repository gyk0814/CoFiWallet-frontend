import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CiUser } from 'react-icons/ci';
import { phoneNumberPattern } from '../../../utils/constant';
import usePostPhoneNumberMutation from '../../../hooks/api/user/usePostPhoneNumberMutation';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import './PhoneNumber.scss';

const PhoneNumber = () => {
  const navigate = useNavigate();
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const phoneNumberIsValid = phoneNumberPattern.test(userPhoneNumber);

  const handleInputChange = e => {
    const inputValue = e.target.value;
    let onlyNumber = inputValue.replace(/[^0-9]/g, '');
    if (onlyNumber.length > 11) {
      onlyNumber = onlyNumber.slice(0, 11);
    }
    setUserPhoneNumber(onlyNumber);
  };

  const onSuccessNavigate = path => {
    navigate(path);
  };

  const mutation = usePostPhoneNumberMutation(
    userPhoneNumber,
    onSuccessNavigate,
  );

  const handlePostPhoneNumber = () => {
    mutation.mutate();
  };

  return (
    <div className="phoneNumberPage">
      <header className="pageTitleBox">Get Started</header>
      <div className="phoneNumber">
        <h1 className="title">Please enter your phone number.</h1>
        <DefaultInput
          icon={<CiUser className="inputIcon" />}
          type="text"
          placeholder="Phone Number"
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
    </div>
  );
};

export default PhoneNumber;
