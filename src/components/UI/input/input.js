import React from 'react';
import classes from './input.module.css';
const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.Input];
  if (props.inValid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.change}
        >
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
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
  }
  return (
    <div className={inputClasses.join(' ')}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
