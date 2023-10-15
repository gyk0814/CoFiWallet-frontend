import React from 'react';
import './DefaultButton.scss';

const DefaultButton = ({ text, onClick, disabled }) => {
  return (
    <button className="defaultButton" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default DefaultButton;
