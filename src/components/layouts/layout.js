import React, { Component, Fragment } from 'react';
import Classes from './layout.module.css';
import Toolbar from './../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  };
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };
  render() {
    return (
      <Fragment>
        <Toolbar />
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
