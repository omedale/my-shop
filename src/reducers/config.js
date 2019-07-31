const initialState = {
  categories: [],
  departments: [],
  attributes: [],
}

const config = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER_DATA':
      return Object.assign({}, state, {
        categories: action.categories,
        departments: action.departments,
        attributes: action.attributes
      })
    default:
      return state
  }
}

export default config;