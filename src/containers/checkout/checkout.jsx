import React, { Component } from 'react';
import CheckoutSummary from './../../components/order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
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
  componentDidMount() {}
  CheckoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  CheckoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
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
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
