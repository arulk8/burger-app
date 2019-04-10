import React, { Component, Fragment } from 'react';
import Classes from './layout.module.css';
import Toolbar from './../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Fragment>
        <Toolbar toggler={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
