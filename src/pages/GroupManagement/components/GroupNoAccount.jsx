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
          alt="Profile"
          onClick={() => navigate('/group/group-user')}
        />
      </div>
      <div className="noAccountContentBox">
        <BsCreditCard size={160} />
        <div className="contentBox">
          <p className="subContent">
            Select and Share <br />
            <span className="blue">accounts/cards</span> to manage jointly
          </p>
        </div>
        <DefaultButton text="Share" onClick={() => {}} />
      </div>
    </div>
  );
};

export default GroupNoAccount;
