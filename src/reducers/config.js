const initialState = {
  categories: [],
  departments: [],
  attributes: [],
  shipping_regions: [],
  tax: []
}

const config = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER_DATA':
      return Object.assign({}, state, {
        categories: action.categories,
        departments: action.departments,
        attributes: action.attributes
      })
    case 'SET_CHECKOUT_DATA':
      return Object.assign({}, state, {
        tax: action.tax,
        shipping_regions: action.shipping_regions,
      })
    default:
      return state
  }
}

export default config;