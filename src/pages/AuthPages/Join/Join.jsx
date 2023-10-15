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
      <header className="pageTitleBox">회원가입</header>
      <div className="phoneNumber">
        {userAuth ? (
          <p className="userAuth userAuthComplete">본인인증 완료.</p>
        ) : (
          <p className="userAuth userAuthPlease">본인인증을 진행해주세요.</p>
        )}
        {!userNameIsValid && (
          <p className="userNameInvalidMessage">
            한국어 이름만 입력 가능합니다. (2글자 이상)
          </p>
        )}
        {!passwordIsValid && (
          <p className="passwordInvalidMessage">
            알파벳 대/소문자, 숫자, 특수문자를 조합하여 10자 이상이어야 합니다.
          </p>
        )}
        {!passwordCheckIsValid && (
          <p className="passwordCheckInvalidMessage">
            비밀번호와 일치하지 않습니다.
          </p>
        )}

        <h1 className="userPhoneNumber">{userPhoneNumber}</h1>
        <DefaultButton text="본인인증" onClick={personalAuth} />

        <h1 className="title">정보를 입력해주세요.</h1>
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
          text="다음"
          onClick={handlePostJoinUserInfo}
          disabled={!allUserInfoIsValid}
        />
      </div>
    </div>
  );
};

export default Join;
