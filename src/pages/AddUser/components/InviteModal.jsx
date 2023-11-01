import React from 'react';
import InviteWithPhoneNumber from './InviteWithPhoneNumber';
import './InviteModal.scss';

const InviteModal = ({ closeModal }) => {
  return (
    <div className="inviteModalBackGround" onClick={closeModal}>
      <div className="inviteModal" onClick={e => e.stopPropagation()}>
        <p className="title">Connection Method</p>
        <InviteWithPhoneNumber closeModal={closeModal} />
      </div>
    </div>
  );
};

export default InviteModal;
