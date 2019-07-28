import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/order/Order';
import axios from '../../services/axios-orders';
import withErrorHandler from './../../Hoc/errorHandler/withErrorHandler';

import { fetchOrders } from './../../store/actions/order';
import Loader from './../../components/UI/loader/loader';
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
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
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  };
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
