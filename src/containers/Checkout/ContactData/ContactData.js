import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);

    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'May',
        address: {
          street: 'street 1',
          zipCode: '12045',
          country: 'Thailand'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        // console.log('response: ', response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        // console.log('error: ', error);
        this.setState({loading: false});
      });
  }

  render() {
    let form = (
      <form>
        <Input inputtype="input"  type="text" name="name" placeholder="Your Name" />
        <Input inputtype="input"  type="email" name="email" placeholder="Your Mail" />
        <Input inputtype="input"  type="text" name="street" placeholder="street" />
        <Input inputtype="input"  type="text" name="postal" placeholder="Your postal Code" />
        <Button btnType="Success" cilcked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if(this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data </h4>
        {form}
      </div>
    );
  }
}

export default ContactData;