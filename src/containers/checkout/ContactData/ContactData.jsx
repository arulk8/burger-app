import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../services/axios-orders';
import Loader from '../../../components/UI/loader/loader';

import Input from './../../../components/UI/input/input';
class ContactData extends Component {
  state = {
    orderForm: {
      name: 'arul',
      street: 'Test street1',
      zipCode: '343453463',
      country: 'india',
      email: 'arulm@gmail.com',
      deliveryMethod: 'Prime',

      loading: false
    }
  };
  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
    };
    axios
      .post('/orders.json', order)
      .then(i => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(i => {
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="name"
          placeholder="my name"
          name="name"
        />
        <Input
          inputtype="input"
          type="email"
          placeholder="my email"
          name="email"
        />
        <Input
          inputtype="input"
          type="street"
          placeholder="my street"
          name="street"
        />
        <Input
          inputtype="input"
          type="postal"
          placeholder="my postal code"
          name="postal"
        />
        <Button clicked={event => this.orderHandler(event)} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Loader />;
    }
    return (
      <div className={classes.ContactData}>
        <h4> enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
