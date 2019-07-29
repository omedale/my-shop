const initialState = {
  customer: null,
  token: null,
  error: null,
  isLoading: false
}

const customer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_CUSTOMER':
      return {
        ...state,
        customer: null,
        token: null,
        error: null,
        isLoading: true
      };
    case 'AUTHENTICATION_SUCCESS':
        return {
          ...state,
          customer: action.customer,
          token: action.token,
          error: null,
          isLoading: false
        };
    case 'AUTHENTICATION_ERROR':
      return {
        ...state,
        customer: null,
        token: null,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default customer;