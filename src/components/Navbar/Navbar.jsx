import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_BUTTONS } from '../../utils/constant';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navBar">
      <ul className="buttons">
        {NAVIGATION_BUTTONS.map(({ name, path, icon }, i) => (
          <li className="button" key={i} onClick={() => navigate(path)}>
            {icon}
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
