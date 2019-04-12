import React, { Component } from 'react';
import CheckoutSummary from './../../components/order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1
    }
  };
  CheckoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    console.log(this.props.history);
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.CheckoutCanceledHandler}
          checkoutContinue={this.CheckoutContinueHandler}
          ingredients={this.state.ingredients}
        />
      </div>
    );
  }
}

export default Checkout;
