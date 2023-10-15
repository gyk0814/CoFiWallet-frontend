import React from 'react';
import './DefaultInput.scss';

const DefaultInput = ({ icon, type, id, onChange, placeholder, value }) => {
  return (
    <div className="inputContainer">
      {icon}
      <input
        className="defaultInput"
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DefaultInput;
