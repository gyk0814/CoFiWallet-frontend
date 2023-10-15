import React from 'react';
import './AccountList.scss';

const AccountList = ({ profileImage, accountImage, accountName }) => {
  return (
    <div className="accountListContainer">
      <img
        className="userPofileImage"
        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Jm92YqMxbfwC4Aez6Yc85ZODI5uaHR3KxUZnUlRtKSjBju2M"
        alt="프로필"
      />
      <img className="accountImage" src={accountImage} alt="은행" />
      <p className="accountName">{accountName}</p>
    </div>
  );
};

export default AccountList;
