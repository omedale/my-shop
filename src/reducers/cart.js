const initialState = {
  cartId: '',
  status: false,
  carts: [],
  cartLoading: false
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CART_CONFIG':
      return {
        ...state,
        cartId: action.cartId,
        status: action.status
      };
    case 'UPDATE_CART':
      return {
        ...state,
        cartLoading: true
      }
    case 'UPDATE_CART_ID_STATUS':
        return {
          ...state,
          status: action.status
        }
    case 'FETCH_CART_SUCCESS':
      return {
        ...state,
        cartLoading: false,
        carts: action.carts
      }
    default:
      return state;
  }
}

export default cart;