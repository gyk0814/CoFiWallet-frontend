import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CALENDAR_MODAL_LIST } from '../../utils/constant';
import './CalendarModal.scss';

const CalendarModal = ({ closeModal, onDateSelect }) => {
  const handleItemClick = date => {
    onDateSelect(date);
    closeModal();
  };

  return (
    <div className="calendarModalBackGround">
      <div className="backDrop" onClick={closeModal} />
      <div className="calendarContentBox">
        <button className="xButton">
          <AiOutlineClose onClick={closeModal} />
        </button>
        <ul className="calendarModal">
          {CALENDAR_MODAL_LIST.map((date, i) => (
            <li
              className="calendarModalItem"
              key={i}
              onClick={() => handleItemClick(date.title)}
            >
              {date.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarModal;
