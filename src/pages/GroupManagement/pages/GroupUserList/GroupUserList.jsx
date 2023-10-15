import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useGetGroupUsers } from '../../../../hooks/api/useGetGroupUser';
import Loading from '../../../../components/Loading/Loading';
import GroupUser from './components/GroupUser';
import './GroupUserList.scss';

const id = localStorage.getItem('id');

const GroupUserList = () => {
  const navigate = useNavigate();

  const { isLoading, data: userList } = useGetGroupUsers();

  if (isLoading) return <Loading />;

  return (
    <div className="groupUserListContainer">
      <div className="groupUserLIstTitleBox">
        <BiArrowBack
          size={20}
          className="arrowBack"
          onClick={() => navigate(-1)}
        />
        <h1 className="title">공동관리 설정</h1>
      </div>
      <div className="groupUserListContentContainer">
        {userList.map(el => (
          <GroupUser
            key={el.userId}
            profileImage={el.profileImage}
            userId={el.userId}
            userName={el.userName}
            sharedCount={el.sharedFinanceCount}
            hideDeleteButton={el.userId === parseInt(id)}
            who={el.userId === parseInt(id) ? 'ME' : 'YOU'}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupUserList;
