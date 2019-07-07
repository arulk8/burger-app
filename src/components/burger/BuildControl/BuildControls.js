import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './common/BuildControl';
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = props => {
  return (
    <div className={classes['build-controls']}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctr => {
        return (
          <BuildControl
            key={ctr.label}
            type={ctr.type}
            label={ctr.label}
            added={() => props.ingredientAdded(ctr.type)}
            removed={() => props.ingredientRemoved(ctr.type)}
            disabled={props.disabled[ctr.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO PROCEED'}
      </button>
    </div>
  );
};

export default BuildControls;
