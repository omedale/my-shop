import { SET_FILTER_DATA } from '../constants/config';
import ConfigService from '../services/config';

const setFilterData = (data) => {
  return {
    type: SET_FILTER_DATA,
    categories: (data && data.categories.length) ? data.categories : [],
    departments: data && data.departments ? data.departments : [],
    attributes: data && data.attributes ? data.attributes : []
  }
}

export const getFilterData = () => {
  return (dispatch, getState) => {
    if (getState().config.categories.length === 0) {
      ConfigService.getFilterData()
      .then(response => {
        dispatch(setFilterData(response.data))
      })
      .catch(error => console.log(error.response.data.error))
    }
  }
}