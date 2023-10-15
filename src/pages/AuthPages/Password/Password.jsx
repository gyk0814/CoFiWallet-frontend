import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { passwordPattern } from '../../../utils/constant';
import { CiLock } from 'react-icons/ci';
import useSignInMutation from '../../../hooks/api/user/useSignInMutation';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import './Password.scss';

const Password = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const passwordIsValid = passwordPattern.test(password);
  const userPhoneNumber = localStorage.getItem('userPhoneNumber');

  const onSuccessSignIn = () => {
    navigate('/main');
  };
  const signInMutation = useSignInMutation(onSuccessSignIn);
  const handlePostPassword = () => {
    signInMutation.mutate({ phoneNumber: userPhoneNumber, password: password });
  };

  return (
    <div className="passwordPage">
      <header className="pageTitleBox">로그인</header>
      <div className="password">
        <h1 className="title">비밀번호를 입력해주세요.</h1>
        <DefaultInput
          icon={<CiLock className="inputIcon" />}
          type="password"
          placeholder="비밀번호"
          id="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <DefaultButton
          text="로그인"
          onClick={handlePostPassword}
          disabled={!passwordIsValid}
        />
      </div>
    </div>
  );
};

export default Password;
