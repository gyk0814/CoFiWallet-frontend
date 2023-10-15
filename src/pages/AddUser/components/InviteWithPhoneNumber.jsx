import React, { useState } from 'react';
import { BsPhone } from 'react-icons/bs';
import PhoneNumberInput from './PhoneNumberInput';
import './InviteWithPhoneNumber.scss';

const InviteWithPhoneNumber = ({ closeModal }) => {
  const [isOpenPhoneNumberInput, setIsOpenPhoneNumberInput] = useState(false);

  const handleClickToSwitch = () => {
    setIsOpenPhoneNumberInput(true);
  };

  return (
    <div className="invite">
      {!isOpenPhoneNumberInput ? (
        <div className="inviteContainer" onClick={handleClickToSwitch}>
          <BsPhone size={50} className="phoneIcon" />
          <h1 className="inviteMethod">핸드폰 번호</h1>
        </div>
      ) : (
        <PhoneNumberInput closeModal={closeModal} />
      )}
    </div>
  );
};

export default InviteWithPhoneNumber;
