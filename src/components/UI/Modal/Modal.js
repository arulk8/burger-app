import classes from './Modal.module.css';
import React, { Component, Fragment } from 'react';
import Backdrop from './../Backdrop/Backdrop';
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.showb ||
      nextProps.props.children !== this.props.children
    );
  }
  componentWillUpdate() {
    console.log('[Modal] updated');
  }
  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
