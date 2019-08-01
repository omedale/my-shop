
const initialState = {
  products: [],
  count: 0,
  loading: false
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return Object.assign({}, state, {
        loading: true
      })
    case 'FETCH_PRODUCTS_SUCCESS':
      return Object.assign({}, state, {
        products: action.products,
        count: action.count,
        loading: false
      })
    case 'FILTER_PRODUCTS_SUCCESS':
      return Object.assign({}, state, {
        products: action.products,
        count: action.count,
        loading: false
      })
    default:
      return state;
  }
}

export default product;