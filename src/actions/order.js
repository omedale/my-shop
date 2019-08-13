import { CREATE_ORDER, CREATE_ORDER_SUCCESS } from '../constants/order';
import { resetCartConfig } from '../actions/cart';
import OrderService from '../services/order';

const createOrder = () => {
  return {
    type: CREATE_ORDER
  }
}

const createOrderSuccess = () => {
  return {
    type: CREATE_ORDER_SUCCESS
  }
}

export const createCustomerOrder = (data, token, totalAmount) => {
  return (dispatch, getState) => {
    dispatch(createOrder())
    OrderService.order(data)
    .then(response => {
      const chargeData = {
        stripeToken: token.id,
        order_id: response.data.orderId,
        'description': 'Shoppy receipt',
        'amount': Math.round(totalAmount / 100)
      }
      dispatch(resetCartConfig())
      dispatch(chargeCustomer(chargeData))
    })
    .catch(error => console.log(error.response.data.error))
  }
}

const chargeCustomer = (chargeData) => {
  return (dispatch, getState) => {
    OrderService.charge(chargeData)
    .then(response => {
      dispatch(createOrderSuccess(response.data))
    })
    .catch(error => console.log(error.response.data.error))
  }
}