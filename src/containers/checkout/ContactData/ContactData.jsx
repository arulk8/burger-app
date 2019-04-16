import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../services/axios-orders';
import Loader from '../../../components/UI/loader/loader';

import Input from './../../../components/UI/input/input';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      },

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
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {formElements.map(i => {
          return (
            <Input
              key={i.key}
              elementConfig={i.config.elementConfig}
              elementType={i.config.elementType}
              value={i.config.value}
            />
          );
        })}

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
