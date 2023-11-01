import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import './Intro.scss';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="introBackGround">
      <div className="intro">
        <h2 className="twoPoints">. .</h2>
        <div className="titleBox">
          <h2>Smart Collaborative</h2>
          <h2>Asset Management</h2>
        </div>
        <div className="logoBox">
          <h1 className="logo">CoFi</h1>
          <h1 className="logo">Wallet</h1>
        </div>
        <DefaultButton
          text="Get Started"
          onClick={() => {
            navigate('/login');
          }}
        />
      </div>
    </div>
  );
};

export default Intro;
