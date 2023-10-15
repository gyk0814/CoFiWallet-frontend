import React from 'react';
import { ImBin2 } from 'react-icons/im';
import { useDeleteGroupUser } from '../../../../../hooks/api/useDeleteGroupUser';
import './GroupUser.scss';

const GroupUser = ({
  userId,
  userName,
  hideDeleteButton,
  profileImage,
  sharedCount,
  who,
}) => {
  const deleteUser = useDeleteGroupUser();

  return (
    <div className="groupUserContainer">
      <div className="groupUserDetailBox">
        <div className="groupUserDetailHeader">
          <span className="who">{who}</span>
          {!hideDeleteButton && (
            <ImBin2
              size={15}
              className="deleteButton"
              onClick={() => deleteUser.mutate(userId)}
            />
          )}
        </div>
        <img
          src={
            profileImage || 'https://picpac.kr/common/img/default_profile.png'
          }
          alt="프로필"
          className="userProfileImage"
        />
        <h1>{userName}</h1>
        <span className="count">공유 {sharedCount}건</span>
      </div>
    </div>
  );
};

export default GroupUser;
