import { SET_FILTER_DATA, SET_CHECKOUT_DATA } from '../constants/config';
import ConfigService from '../services/config';

const setFilterData = (data) => {
  return {
    type: SET_FILTER_DATA,
    categories: (data && data.categories.length) ? data.categories : [],
    departments: data && data.departments ? data.departments : [],
    attributes: data && data.attributes ? data.attributes : []
  }
}

const setCheckOutData = (data) => {
  return {
    type: SET_CHECKOUT_DATA,
    tax: data && data.tax.length ? data.tax : [],
    shipping_regions: data && data.shipping_regions.length ?
                          data.shipping_regions.filter(item => 
                            item.shipping_region_id !== 1) : [],
  }
}

export const getCheckOutData = () => {
  return (dispatch, getState) => {
    if (getState().config.tax.length === 0) {
      ConfigService.getCheckOutData()
      .then(response => {
        dispatch(setCheckOutData(response.data))
      })
      .catch(error => console.log(error.response.data.error))
    }
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