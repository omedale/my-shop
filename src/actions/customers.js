import { AUTHENTICATION_CUSTOMER, AUTHENTICATION_ERROR, AUTHENTICATION_SUCCESS, LOGOUT_CUSTOMER, UPDATE_CUSTOMER_ADDRESS } from '../constants/customers'
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

const updateAddress = (customer) => {
  return {
    type: UPDATE_CUSTOMER_ADDRESS,
    customer: customer
  }
}

const logout = () => {
  return {
    type: LOGOUT_CUSTOMER,
  }
}

export const updateCustomerAddress = (data) => {
  return  (dispatch, getState) => {
    CustomerService.updateAddress(data)
    .then(response => {
      dispatch(updateAddress(response.data))
    })
    .catch(error => {
      console.log(error.response.data.error)
    })
  }
}

export const logoutCustomer = () => {
  return (dispatch, getState) => {
    dispatch(logout())
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