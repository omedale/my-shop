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
        carts: [],
        cartId: action.cartId,
        status: action.status
      };
    case 'REMOVE_CART_ITEM_SUCCESS':
      return {
        ...state,
        carts: state.carts.filter(item => (parseInt(item.item_id) !== parseInt(action.itemId))),
        cartLoading: action.cartLoading
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