import React from 'react';
import classes from './input.module.css';
const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={classes.Input}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.Input}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select className={classes.Input} value={props.value}>
          {props.elementConfig.options.map(i => {
            return (
              <option key={i.displayValue} value={i.value}>
                {i.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.Input}
          {...props.elementConfig}
          value={props.value}
        />
      );
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
