import React from 'react';
import classes from './input.module.css';
const Input = props => {
  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input className={classes.Input} {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className={classes.Input} {...props} />;
      break;
    default:
      inputElement = <input className={classes.Input} {...props} />;
      break;
  }
  return (
    <div className={classes.inputElement}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
