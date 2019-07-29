import { AUTHENTICATION_CUSTOMER, AUTHENTICATION_ERROR, AUTHENTICATION_SUCCESS } from '../constants/customers'
import CustomerService from '../services/authentication'

const authenticationSuccess = (customer) => {
  return {
    type: AUTHENTICATION_SUCCESS,
    customer: customer.customer.schema,
    token: customer.accessToken
  }
}

const updateCustomer = () => {
  return {
    type: AUTHENTICATION_CUSTOMER
  }
}

const authenticationError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    error
  }
}



export const authenticationCustomer = (customer, authType) => {
  return (dispatch, getState) => {
    dispatch(updateCustomer())
    if (authType === 'REGISTER') {
      CustomerService.register(customer)
      .then(response => {
        dispatch(authenticationSuccess(response.data))
      })
      .catch(error => {
        dispatch(authenticationError(error.response.data.error))
      })
    } else {
      CustomerService.login(customer)
      .then(response => {
        dispatch(authenticationSuccess(response.data))
      })
      .catch(error => {
        dispatch(authenticationError(error.response.data.error))
      })
    }
  }
}