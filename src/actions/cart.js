import { FETCH_CART_SUCCESS, UPDATE_CART, UPDATE_CART_CONFIG, REMOVE_CART_ITEM_SUCCESS } from '../constants/cart';
import CartService from '../services/cart';


const updatingCart = () => {
  return {
    type: UPDATE_CART
  }
}

const updateCartSuccess = (data) => {
  return {
    type: FETCH_CART_SUCCESS,
    cartLoading: false,
    carts: data
  }
}

const removeCartItemSuccess = (itemId) => {
  return {
    itemId,
    type: REMOVE_CART_ITEM_SUCCESS,
    cartLoading: false
  }
}

const setCartConfig = (data) => {
  return {
    type: UPDATE_CART_CONFIG,
    cartId: data.cart_id,
    status: true
  }
}

export const addCart = (data) => {
  return (dispatch, getState) => {
    dispatch(updatingCart())
    CartService.addCart(data)
    .then(response => {
      dispatch(updateCartSuccess(response.data))
    })
    .catch(error => console.log(error.response.data.error))
  }
}

export const removeCartItem = (itemId) => {
  return (dispatch, getState) => {
    dispatch(updatingCart())
    CartService.removeProduct(itemId)
    .then(response => {
      dispatch(removeCartItemSuccess(itemId))
    })
    .catch(error => console.log(error.response.data.error))
  }
}

export const updateCart = (data) => {
  return (dispatch, getState) => {
    dispatch(updatingCart())
    CartService.updateCart(data)
    .then(response => {
      dispatch(updateCartSuccess(response.data))
    })
    .catch(error => console.log(error.response.data.error))
  }
}

export const fetchCart = (cartId) => {
  return (dispatch, getState) => {
    dispatch(updatingCart())
    CartService.getAllCartItem(cartId)
    .then(response => {
      dispatch(updateCartSuccess(response.data))
    })
    .catch(error => console.log(error.response.data.error))
  }
}

export const resetCartConfig = () => {
  return (dispatch, getState) => {
    CartService.getCartID()
    .then(response => {
      dispatch(setCartConfig(response.data))
    })
    .catch(error => console.log(error.response.data.error))
  }
}

export const getCartConfig = () => {
  return (dispatch, getState) => {
    if (!getState().cart.cartId || !getState().cart.status) {
      CartService.getCartID()
      .then(response => {
        dispatch(setCartConfig(response.data))
      })
      .catch(error => console.log(error.response.data.error))
    }
  }
}