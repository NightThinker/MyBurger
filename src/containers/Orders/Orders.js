import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.onFatchOrders(this.props.token)
  }

  render() {
    let orders = <Spinner />
    if (this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order 
              key={order.id}
              ingredients={order.ingredients}
              price={order.price} />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDisptchToProps = dispatch => {
  return {
    onFatchOrders: (token) => dispatch(actions.fatchOrders(token))
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(withErrorHandler(Orders, axios));