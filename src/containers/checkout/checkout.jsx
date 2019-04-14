import React, { Component } from 'react';
import CheckoutSummary from './../../components/order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0
  };
  componentDidMount() {
    const query = new URLSearchParams(
      decodeURIComponent(this.props.location.search)
    );
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    const totalPrice = ingredients.totalPrice;
    delete ingredients['totalPrice'];
    this.setState({ totalPrice });
    this.setState({ ingredients });
  }
  CheckoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.CheckoutCanceledHandler}
          checkoutContinue={this.CheckoutContinueHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
