import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Common/Loader'
import ProductList from '../../components/ProductList/ProductList'
import ProductDetail from '../../components/ProductDetail/ProductDetail'

const PAGE = 1
const Products = (props) => {
  const [currentPage, changePage] = useState(PAGE);
  const [showModal, toggleModal] = useState(false);
  const [currentImage, toggleImage] = useState('');
  const [color, toggleColor] = useState('');
  const [size, toggleSize] = useState('');
  const [images, getImages] = useState([]);
  const [product, getProduct] = useState({});
  const products =  useSelector(state  => state.product.products)
  const attributes =  useSelector(state  => state.config.attributes)
  const total =  useSelector(state  => state.product.count)
  const isLoading = useSelector(state  => state.product.loading)


  const colorAttribute = attributes.filter(attribute => attribute.name === 'Color')
  const colors = colorAttribute.length ? colorAttribute[0].attribute_values : []

  const sizeAtribute = attributes.filter(attribute => attribute.name === 'Size')
  const sizes = sizeAtribute.length ? sizeAtribute[0].attribute_values : []

  const handlePageChange = (value) => {
    changePage(value)
  }

  const showProductDetail = (id) => {
    const currentProduct = products.find(product => product.product_id === id)
    getProduct(currentProduct)
    toggleImage(currentProduct.image)
    getImages([currentProduct.image, currentProduct.image_2])
    toggleModal(true)
  }

  const handleCloseModal = () => {
    toggleModal(false)
  }

  const handleAddToCart = () => {
    toggleModal(false)
  }

  const handleChangeImage = (image) => {
    toggleImage(image)
  }

  const handleColorChange = (e) => {
    toggleColor(e.target.value)
  }

  const handleSizeChange = (e) => {
    toggleSize(e.target.value)
  }

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
      { Object.keys(product).length ?
        <ProductDetail
          size={size}
          sizes={sizes}
          setSize={handleSizeChange}
          colors={colors}
          color={color}
          setColor={handleColorChange}
          product={product}
          visible={showModal}
          cancel={handleCloseModal}
          addToCart={handleAddToCart}
          currentImage={currentImage}
          gotoImage={handleChangeImage}
          images={images} /> : 0
      }
    </>
  )
};

export default Products;