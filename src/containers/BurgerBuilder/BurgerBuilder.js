import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSumary from '../../components/Burger/OrderSumary/OrderSumary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    purchasing: false
  }

  componentDidMount () {
    console.log('berger :',this.props);
    this.props.onInitIngredient();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    console.log('disabledInfo: ',disabledInfo);
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary =  null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            ingredientAdded={this.props.onAddedIngredient}
            ingredientRemoved={this.props.onRemovedIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price} />
        </Aux>
      );
      orderSummary = <OrderSumary 
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price} /> ;
    }
  
    //{salad: ture , bacon: false, ...}
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
}

const mapDisptchToProps = dispatch => {
  return {
    onAddedIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onRemovedIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients())
  }
}


export default connect(mapStateToProps, mapDisptchToProps)(withErrorHandler(BurgerBuilder, axios));