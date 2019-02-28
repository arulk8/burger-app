import React from 'react';
import burgerLogo from '../../assests/images/burger-logo.png';
import clasess from './Logo.module.css';
const Logo = props => {
  return (
    <div className={clasess.Logo}>
      <img src={burgerLogo} alt="My Burger" />
    </div>
  );
};

export default Logo;
