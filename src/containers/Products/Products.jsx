import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Common/Loader'
import ProductList from '../../components/ProductList/ProductList'
import ProductDetail from '../../components/ProductDetail/ProductDetail'
import { updateCart } from '../../actions/cart'

const PAGE = 1
const Products = (props) => {
  const dispatch = useDispatch()

  const [currentPage, changePage] = useState(PAGE);
  const [showModal, toggleModal] = useState(false);
  const [currentImage, toggleImage] = useState('');
  const [color, toggleColor] = useState('');
  const [size, toggleSize] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [images, getImages] = useState([]);
  const [product, getProduct] = useState({});
  
  const { products, count, loading } = useSelector(state  => state.product)

  const attributes =  useSelector(state  => state.config.attributes)
  const { carts, cartId } =  useSelector(state  => state.cart)


  const colorAttribute = attributes.filter(attribute => attribute.name === 'Color')
  const colors = colorAttribute.length ? colorAttribute[0].attribute_values : []

  const sizeAtribute = attributes.filter(attribute => attribute.name === 'Size')
  const sizes = sizeAtribute.length ? sizeAtribute[0].attribute_values : []

  const handlePageChange = (value) => {
    changePage(value)
  }

  const showProductDetail = (id) => {
    toggleSize('');
    toggleColor('')
    const currentProduct = products.find(product => product.product_id === id)
    getProduct(currentProduct)
    toggleImage(currentProduct.image)
    getImages([currentProduct.image, currentProduct.image_2])
    toggleModal(true)
  }

  const handleCloseModal = () => {
    toggleModal(false)
  }

  const handleAddToCart = (productId) => {
    setErrorMessage('');
    if (!size || !color) {
      setErrorMessage('Please select color and size');
      return;
    }
    const cartAttributes = `${color}, ${size}`;
    const cart = carts.find(cart => (parseInt(cart.product_id) === parseInt(productId)) &&
                    (cart.attributes === cartAttributes))
    if (cart) {

    } else {
      const data = {
        cart_id: cartId,
        product_id: productId,
        attributes: cartAttributes
      }
      dispatch(updateCart(data))
    }
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
      { loading ? <Loader /> :
        <ProductList 
          isLoading={loading}
          products={products}
          total={count}
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
          images={images}
          errorMessage={errorMessage} /> : 0
      }
    </>
  )
};

export default Products;