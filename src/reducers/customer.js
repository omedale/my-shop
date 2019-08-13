import moment from 'moment'

const initialState = {
  customer: null,
  token: null,
  error: null,
  tokenExpIN: null,
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
        isLoading: true,
        tokenExpIN: null
      };
    case 'LOGOUT_CUSTOMER':
      return {
        ...state,
        customer: null,
        token: null,
        error: null,
        isLoading: false,
        tokenExpIN: null
      };
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        tokenExpIN: moment.utc().add(1, 'day').format('YYYY,MM-DD HH:mm:ss'),
        customer: action.customer,
        token: action.token,
        error: null,
        isLoading: false
      };
    case 'UPDATE_CUSTOMER_ADDRESS':
      return {
        ...state,
        customer: action.customer
      }
    case 'AUTHENTICATION_ERROR':
      return {
        ...state,
        customer: null,
        token: null,
        error: action.error,
        isLoading: false,
        tokenExpIN: null
      };
    default:
      return state;
  }
};

export default customer;