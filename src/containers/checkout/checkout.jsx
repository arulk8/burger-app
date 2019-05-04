import React, { Component } from 'react';
import CheckoutSummary from './../../components/order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
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
  // componentDidMount() {
  //   const query = new URLSearchParams(
  //     decodeURIComponent(this.props.location.search)
  //   );
  //   const ingredients = {};
  //   for (let param of query.entries()) {
  //     ingredients[param[0]] = +param[1];
  //   }
  //   const totalPrice = ingredients.totalPrice;
  //   delete ingredients['totalPrice'];
  //   this.setState({ totalPrice });
  //   this.setState({ ingredients });
  // }
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
          ingredients={this.props.ingredients}
        />
        {/* <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              ingredients={this.props.ingredients}
              totalPrice={this.props.totalPrice}
              {...props}
            />
          )}
        /> */}
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};
export default connect(mapStateToProps)(Checkout);
