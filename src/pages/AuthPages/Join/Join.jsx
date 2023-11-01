import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthMutation from '../../../hooks/api/user/useAuthMutation';
import useSignupMutation from '../../../hooks/api/user/useSignupMutation';
import {
  JOIN_USER_INPUTS,
  koreanPattern,
  passwordPattern,
} from '../../../utils/constant';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import './Join.scss';

const Join = () => {
  const navigate = useNavigate();

  const userPhoneNumber = localStorage.getItem('userPhoneNumber');

  const [userInfo, setUserInfo] = useState({
    userName: '',
    phoneNumber: userPhoneNumber,
    password: '',
    CI: '',
  });

  const [passwordCheck, setPasswordCheck] = useState('');

  const handleChangeUserInfo = e => {
    const { id, value } = e.target;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
  };

  const [userAuth, setUserAuth] = useState(false);
  const userNameIsValid = koreanPattern.test(userInfo.userName);
  const passwordIsValid = passwordPattern.test(userInfo.password);
  const passwordCheckIsValid = userInfo.password === passwordCheck;
  const allUserInfoIsValid =
    userAuth && userNameIsValid && passwordIsValid && passwordCheckIsValid;

  const onSuccessAuthCallback = data => {
    setUserAuth(true);
    setUserInfo(prev => ({ ...prev, CI: data.CI }));
  };

  const authMutation = useAuthMutation(onSuccessAuthCallback);
  const personalAuth = () => {
    authMutation.mutate(userPhoneNumber);
  };

  const onSuccessSignupCallback = () => {
    navigate('/login');
  };
  const onErrorSignupCallback = error => {
    console.log(`콜백 ERROR : ${error.message}`);
  };
  const signupMutation = useSignupMutation(
    onSuccessSignupCallback,
    onErrorSignupCallback,
  );

  const handlePostJoinUserInfo = () => {
    signupMutation.mutate(userInfo);
  };

  return (
    <div className="joinPage">
      <header className="pageTitleBox">Sign Up</header>
      <div className="phoneNumber">
        {userAuth ? (
          <p className="userAuth userAuthComplete">
            Identity verification complete.
          </p>
        ) : (
          <p className="userAuth userAuthPlease">
            Please proceed with identity verification.
          </p>
        )}
        {!userNameIsValid && (
          <p className="userNameInvalidMessage">
            Only Korean names are allowed. (Minimum 2 characters)
          </p>
        )}
        {!passwordIsValid && (
          <p className="passwordInvalidMessage">
            Should contain a combination of uppercase/lowercase letters,
            numbers, and special characters, with a minimum length of 10
            characters.
          </p>
        )}
        {!passwordCheckIsValid && (
          <p className="passwordCheckInvalidMessage">Passwords do not match.</p>
        )}

        <h1 className="userPhoneNumber">{userPhoneNumber}</h1>
        <DefaultButton text="Verify Identity" onClick={personalAuth} />

        <h1 className="title">Please enter your information.</h1>
        {JOIN_USER_INPUTS.map(inputItem => (
          <DefaultInput
            key={inputItem.id}
            icon={inputItem.icon}
            type={inputItem.type}
            placeholder={inputItem.placeholder}
            id={inputItem.id}
            value={
              inputItem.id === 'passwordCheck'
                ? passwordCheck
                : userInfo[inputItem.id]
            }
            onChange={
              inputItem.id === 'passwordCheck'
                ? e => setPasswordCheck(e.target.value)
                : handleChangeUserInfo
            }
          />
        ))}
        <DefaultButton
          text="Next"
          onClick={handlePostJoinUserInfo}
          disabled={!allUserInfoIsValid}
        />
      </div>
    </div>
  );
};

export default Join;
