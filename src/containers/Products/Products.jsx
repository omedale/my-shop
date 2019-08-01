import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Common/Loader'
import { getProducts } from '../../actions/products'
import ProductList from '../../components/ProductList/ProductList'

const Products = () => {
  const [currentPage, changePage] = useState(1);
  const dispatch = useDispatch()
  const products =  useSelector(state  => state.product.products)
  const total =  useSelector(state  => state.product.count)
  const isLoading = useSelector(state  => state.product.loading)

  const handlePageChange = (value) => {
    changePage(value)
  }

  useEffect(() => {
    dispatch(getProducts(currentPage))
  }, [dispatch, currentPage]);

  return (
    <>
      { isLoading ? <Loader /> :
        <ProductList isLoading={isLoading} products={products} total={total} changePage={handlePageChange} current={currentPage} />
      }
    </>
  )
};

export default Products;