import React, { Component } from 'react';
import Order from '../../components/order/Order';
import axios from '../../services/axios-orders';
import withErrorHandler from './../../Hoc/errorHandler/withErrorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get('orders.json')
      .then(res => {
        const arr = [];
        console.log(res.data);
        for (let key in res.data) {
          arr.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: arr });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(i => {
          return (
            <Order key={i.id} ingredient={i.ingredients} price={+i.price} />
          );
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
