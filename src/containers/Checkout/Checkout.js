import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {  

  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  onCheckoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }



  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary 
            ingredients={this.props.ings} 
            onCheckoutCancelled={this.onCheckoutCancelledHandler}  
            onCheckoutContinued={this.onCheckoutContinuedHandler} />
          <Route 
            path={this.props.match.path + '/contact-data'} 
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

const mapDiapatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps)(Checkout);
