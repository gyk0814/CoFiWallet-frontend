import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loadingImg">
      <svg width="80" height="80" viewBox="0 0 100 130" className="loadingSvg">
        <circle
          strokeWidth="5"
          stroke="#fff"
          fill="none"
          cx="50"
          cy="50"
          r="40"
          className="loadingCircle"
        />
        <text fill="#fff" x="18" y="120" className="loadingText">
          Loading..
        </text>
      </svg>
    </div>
  );
};

export default Loading;
