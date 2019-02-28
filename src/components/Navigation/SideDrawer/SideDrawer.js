import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './sideDrawer.module.css';
import Backdrop from './../../UI/Backdrop/Backdrop';
const SideDrawer = props => {
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
