import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };
  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);
  };
  render() {
    return (
      <div className={classes.ContactData}>
        <h4> enter your Contact Data</h4>
        <form>
          <input
            className={ContactData.Input}
            type="name"
            placeholder="my name"
            name="name"
          />
          <input
            className={ContactData.Input}
            type="email"
            placeholder="my email"
            name="email"
          />
          <input
            className={ContactData.Input}
            type="street"
            placeholder="my street"
            name="street"
          />
          <input
            className={ContactData.Input}
            type="postal"
            placeholder="my postal code"
            name="postal"
          />
          <Button clicked={event => this.orderHandler(event)} btnType="Success">
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
