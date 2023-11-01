import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import ChangeProfileImage from './ChangeProfileImage/ChangeProfileImage';
import ChangePassword from './ChangePassword/ChangePassword';
import './MyPage.scss';

const MyPage = () => {
  const navigate = useNavigate();
  const [isProfileBold, setIsProfileBold] = useState(false);
  const [isPasswordBold, setIsPasswordBold] = useState(false);

  const handleProfileClick = () => {
    setIsProfileBold(true);
    setIsPasswordBold(false);
  };

  const handlePasswordClick = () => {
    setIsProfileBold(false);
    setIsPasswordBold(true);
  };

  useEffect(() => {
    handleProfileClick();
  }, []);

  return (
    <div className="myPageContainer">
      <div className="myPageTitleBox">
        <BiArrowBack
          size={20}
          className="arrowBack"
          onClick={() => navigate(-1)}
        />
        <h1 className="title">My Page</h1>
      </div>
      <div className="tabBox">
        <button
          className={`changeBtn ${isProfileBold ? 'bold' : ''}`}
          onClick={handleProfileClick}
        >
          Change Profile Image
        </button>
        <RxDividerVertical size={35} className="divider" />
        <button
          className={`changeBtn ${isPasswordBold ? 'bold' : ''}`}
          onClick={handlePasswordClick}
        >
          Change Password
        </button>
      </div>
      <div className="myPageContentBox">
        {isProfileBold ? <ChangeProfileImage /> : <ChangePassword />}
      </div>
    </div>
  );
};

export default MyPage;
