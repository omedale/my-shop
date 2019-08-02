import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Common/Loader'
import { getProducts } from '../../actions/products'
import ProductList from '../../components/ProductList/ProductList'
import ProductDetail from '../../components/ProductDetail/ProductDetail'

const PAGE = 1
const Products = (props) => {
  const [currentPage, changePage] = useState(PAGE);
  const [showModal, toggleModal] = useState(false);
  const dispatch = useDispatch()
  const products =  useSelector(state  => state.product.products)
  const total =  useSelector(state  => state.product.count)
  const isLoading = useSelector(state  => state.product.loading)

  const handlePageChange = (value) => {
    changePage(value)
  }

  const showProductDetail = (id) => {
    toggleModal(true)
  }

  const handleCloseModal = () => {
    toggleModal(false)
  }

  const handleAddToCart = () => {
    toggleModal(false)
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
          showProduct={showProductDetail}
        />
      }
      <ProductDetail visible={showModal} cancel={handleCloseModal} addToCart={handleAddToCart} />
    </>
  )
};

export default Products;