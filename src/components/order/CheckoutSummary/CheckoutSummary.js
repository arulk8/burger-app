import React from 'react';
import Burger from '../../burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

// parent -> checkout
const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1> we hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
        <Button clicked={props.checkoutCanceled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={props.checkoutContinue} btnType="Success">
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
