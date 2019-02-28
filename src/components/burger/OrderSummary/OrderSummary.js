import React from 'react';
import Button from './../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredient).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
        {props.ingredient[key]}
      </li>
    );
  });
  return (
    <React.Fragment>
      <h3> Your Order</h3>
      <p>A delicious burger with the following ingredeints </p>
      <ul>{ingredientSummary}</ul>
      <p>Proceed to Checkout?</p>
      <p>
        <strong>total price: {props.totalPrice}</strong>
      </p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        Continue
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
