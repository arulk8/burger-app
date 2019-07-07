import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/order/Order';
import axios from '../../services/axios-orders';
import withErrorHandler from './../../Hoc/errorHandler/withErrorHandler';

import { fetchOrders } from './../../store/actions/order';
import Loader from './../../components/UI/loader/loader';
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }
  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    return (
      <div>
        {this.props.orders.map(i => {
          return (
            <Order key={i.id} ingredient={i.ingredients} price={+i.price} />
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(fetchOrders(token))
  };
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
