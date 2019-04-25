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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 8
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {
          required: false
        },
        valid: true,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim(' ') !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = rules.minLength <= Number(value.length) && isValid;
    }
    if (rules.maxLength) {
      isValid = rules.maxLength >= Number(value.length) && isValid;
    }
    return isValid;
  };
  inputChangeHandler = (event, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[key] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[key] = updatedFormElement;
    let formIsValid = true;
    for (let inputItem in this.state.orderForm) {
      formIsValid = updatedOrderForm[inputItem].valid && formIsValid;
    }
    console.log('form is valid', formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  orderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for (let field in this.state.orderForm) {
      formData[field] = this.state.orderForm[field].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
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
      <form onSubmit={this.orderHandler}>
        {formElements.map(i => {
          return (
            <Input
              change={event => this.inputChangeHandler(event, i.id)}
              key={i.id}
              elementConfig={i.config.elementConfig}
              elementType={i.config.elementType}
              value={i.config.value}
              inValid={!i.config.valid}
              shouldValidate={i.config.validation}
              touched={i.config.touched}
            />
          );
        })}

        <Button disabled={!this.state.formIsValid} btnType="Success">
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
