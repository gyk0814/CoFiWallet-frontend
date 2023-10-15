import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCreditCard } from 'react-icons/bs';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import './GroupNoAccount.scss';

const GroupNoAccount = () => {
  const navigate = useNavigate();
  return (
    <div className="noAccountContainer">
      <div className="header">
        <img
          className="profileImage"
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Jm92YqMxbfwC4Aez6Yc85ZODI5uaHR3KxUZnUlRtKSjBju2M"
          alt="프로필"
          onClick={() => navigate('/group/group-user')}
        />
      </div>
      <div className="noAccountContentBox">
        <BsCreditCard size={160} />
        <div className="contentBox">
          <p className="subContent">
            공동으로 관리할 <br />
            <span className="blue">계좌/카드</span>를 공유하세요
          </p>
        </div>
        <DefaultButton text="공유하기" onClick={() => {}} />
      </div>
    </div>
  );
};

export default GroupNoAccount;
