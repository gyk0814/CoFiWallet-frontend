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
          <span>Manage together</span>
        </p>
        <p className="subContent">
          With family and friends, <br />
          you can share accounts and cards.
        </p>
      </div>
      <DefaultButton text="Start Shared Management" onClick={handleOpenModal} />
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
