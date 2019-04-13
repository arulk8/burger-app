import React, { Component, Fragment } from 'react';
import Burger from '../../components/burger/Burger';
import BuildControls from './../../components/burger/BuildControl/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/burger/OrderSummary/OrderSummary';
import axios from '../../services/axios-orders';
import Loader from '../../components/UI/loader/loader';
import withErrorHandler from './../../Hoc/errorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };
  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        console.error(err);
      });
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
    this.setState({
      purchasable: sum > 0
    });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedcount = oldCount + 1;
    const updatedIngredient = {
      ...this.state.ingredients
    };
    updatedIngredient[type] = updatedcount;

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENTS_PRICE[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
    this.updatedPurchaseState(updatedIngredient);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedcount = oldCount - 1;
    const updatedIngredient = {
      ...this.state.ingredients
    };
    updatedIngredient[type] = updatedcount;

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENTS_PRICE[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    console.log('clicked');
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    const queryParam = [];
    for (let i in this.state.ingredients) {
      queryParam.push(encodeURIComponent(i + '=' + this.state.ingredients[i]));
    }
    const queryString = queryParam.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
    return false;

    // this.setState({ loading: true });
    // const order = {
    //   ingredient: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'arul'
    //   },
    //   address: {
    //     street: 'Test street1',
    //     zipCode: '343453463',
    //     country: 'india'
    //   },
    //   email: 'arulm@gmail.com',
    //   deliveryMethod: 'Prime'
    // };
    // axios
    //   .post('/orders.json', order)
    //   .then(i => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(i => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
  };

  render() {
    let orderSummary = null;
    if (this.state.loading) {
      console.log(this.state.loading);
      orderSummary = <Loader />;
    }

    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <Loader />;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredient={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Loader />;
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

export default withErrorHandler(BurgerBuilder, axios);
