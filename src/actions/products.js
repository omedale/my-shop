import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS } from '../constants/products';
import ProductServices from '../services/products';

const fetchProduct = (data) => {
  return {
    type: FETCH_PRODUCTS
  }
}

const fetchProductSuccess = (data) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products: data.rows,
    count: data.count
  }
}


export const getProducts = (page) => {
  return (dispatch, getState) => {
    dispatch(fetchProduct())
    ProductServices.getProducts(page)
    .then(response => {
      dispatch(fetchProductSuccess(response.data))
    })
    .catch(error => console.log(error.response.data.error))
  }
}

export const searchProducts = (page, searchWord) => {
  return (dispatch, getState) => {
    dispatch(fetchProduct())
    ProductServices.searchProducts(page, searchWord)
    .then(response => {
      dispatch(fetchProductSuccess(response.data))
    })
    .catch(error => console.log(error.response.data.error))
  }
}