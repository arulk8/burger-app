import React, { Component } from 'react';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[ordersummary] update');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredient).map(key => {
      return (
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}>{key}</span>:{' '}
          {this.props.ingredient[key]}
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
          <strong>total price: {this.props.totalPrice}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          Continue
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
