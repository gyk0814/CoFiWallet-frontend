import React, { useState } from 'react';
import { GrGroup } from 'react-icons/gr';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import InviteModal from './components/InviteModal';
import './AddUser.scss';
import Navbar from '../../components/Navbar/Navbar';

const AddUser = () => {
  const [isOpenStartGroupModal, setIsOpenStartGroupModal] = useState(false);

  const closeModal = () => {
    setIsOpenStartGroupModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenStartGroupModal(true);
  };

  return (
    <div className="addUserContainer">
      <GrGroup size={160} />
      <div className="contentBox">
        <p className="content">
          <span>공동관리</span>로 관리하세요
        </p>
        <p className="subContent">
          가족, 친구들과 <br />
          계좌/카드를 공유할 수 있어요
        </p>
      </div>
      <DefaultButton text="공동관리 시작하기" onClick={handleOpenModal} />
      {isOpenStartGroupModal && (
        <>
          <InviteModal
            isOpenAddUserModal={isOpenStartGroupModal}
            closeModal={closeModal}
          />
          <Navbar />
        </>
      )}
    </div>
  );
};

export default AddUser;
