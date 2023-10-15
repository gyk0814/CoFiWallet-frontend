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
          <h2>똑똑한</h2>
          <h2>자산 공동관리</h2>
        </div>
        <div className="logoBox">
          <h1 className="logo">RICH</h1>
          <h1 className="logo">Maker</h1>
        </div>
        <DefaultButton
          text="시작하기"
          onClick={() => {
            navigate('/login');
          }}
        />
      </div>
    </div>
  );
};

export default Intro;
