import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS } from '../constants/products';
import ProductServices from '../services/products';
const initialFilterData = {department_ids: [], category_ids: [], price_range: [0, 0]};

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

export const getProducts = (page, searchWord = '', filterData = initialFilterData) => {
  return (dispatch, getState) => {
    dispatch(fetchProduct())
    if (searchWord.trim().length) {
      ProductServices.searchProducts(page, searchWord, filterData)
      .then(response => {
        dispatch(fetchProductSuccess(response.data))
      })
      .catch(error => console.log(error.response.data.error))
    } else {
      ProductServices.getProducts(page, filterData)
      .then(response => {
        dispatch(fetchProductSuccess(response.data))
      })
      .catch(error => console.log(error.response.data.error))
    }
  }
}
