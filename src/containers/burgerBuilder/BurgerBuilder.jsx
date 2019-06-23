import React, { Component, Fragment } from 'react';
import Burger from '../../components/burger/Burger';
import BuildControls from './../../components/burger/BuildControl/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/burger/OrderSummary/OrderSummary';
import axios from '../../services/axios-orders';
import Loader from '../../components/UI/loader/loader';
import withErrorHandler from './../../Hoc/errorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { purchaseInit } from './../../store/actions/order';
import {
  addIngredient,
  removeIngredient,
  initIngredents
} from './../../store/actions/burgerBuilder';
class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    this.props.onInitIngredient();
  }
  updatedPurchaseState(updatedIngredient) {
    const ingredient = {
      ...updatedIngredient
    };
    const sum = Object.keys(ingredient)
      .map(key => {
        return ingredient[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedcount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredient[type] = updatedcount;

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + INGREDIENTS_PRICE[type];
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  //   this.updatedPurchaseState(updatedIngredient);
  // };
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedcount = oldCount - 1;
  //   const updatedIngredient = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredient[type] = updatedcount;

  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - INGREDIENTS_PRICE[type];
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  // };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    console.log('clicked');
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    // const queryParam = [];
    // for (let i in this.state.ingredients) {
    //   queryParam.push(encodeURIComponent(i + '=' + this.state.ingredients[i]));
    // }
    // queryParam.push(encodeURIComponent('totalPrice=' + this.state.totalPrice));
    // const queryString = queryParam.join('&');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout'
    });
    return false;
  };

  render() {
    let orderSummary = null;
    if (this.state.loading) {
      console.log(this.state.loading);
      orderSummary = <Loader />;
    }

    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p> Ingredient cannot be loaded</p>
    ) : (
      <Loader />
    );

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatedPurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredient={this.props.ings}
          totalPrice={this.props.totalPrice}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapReduxStateToReactProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.error
  };
};
const mapReduxDispathToReactProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(removeIngredient(ingName)),
    onInitIngredient: () => dispatch(initIngredents()),
    onInitPurchase: () => dispatch(purchaseInit())
  };
};

export default connect(
  mapReduxStateToReactProps,
  mapReduxDispathToReactProps
)(withErrorHandler(BurgerBuilder, axios));
