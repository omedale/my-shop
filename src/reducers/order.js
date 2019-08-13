
const order = (state = {isLoading: false}, action) => {
  switch (action.type) {
    case 'CREATE_ORDER':
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'CREATE_ORDER_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false
      })
    default:
      return state;
  }
}

export default order;