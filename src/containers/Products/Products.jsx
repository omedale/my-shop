import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Common/Loader'
import { getProducts } from '../../actions/products'
import ProductList from '../../components/ProductList/ProductList'

const PAGE = 1
const Products = (props) => {
  const [currentPage, changePage] = useState(PAGE);
  const dispatch = useDispatch()
  const products =  useSelector(state  => state.product.products)
  const total =  useSelector(state  => state.product.count)
  const isLoading = useSelector(state  => state.product.loading)

  const handlePageChange = (value) => {
    changePage(value)
  }

  useEffect(() => {
    const params = new URLSearchParams(props.history.location.search)
    const searchQuery = params.get('q');
    const searchParam = searchQuery ? searchQuery : '';
    dispatch(getProducts(currentPage, searchParam))
  }, [dispatch, currentPage, props.history.location.search]);

  return (
    <>
      { isLoading ? <Loader /> :
        <ProductList 
          isLoading={isLoading}
          products={products}
          total={total}
          changePage={handlePageChange}
          current={currentPage}
          />
      }
    </>
  )
};

export default Products;