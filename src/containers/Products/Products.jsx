import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Common/Loader'
import ProductList from '../../components/ProductList/ProductList'
import ProductDetail from '../../components/ProductDetail/ProductDetail'
import { updateCart, addCart } from '../../actions/cart'
import { getProducts } from '../../actions/products';
import Helper from '../../util/helper';

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
  const { carts, cartId, cartLoading } =  useSelector(state  => state.cart)


  const colorAttribute = attributes.filter(attribute => attribute.name === 'Color')
  const colors = colorAttribute.length ? colorAttribute[0].attribute_values : []

  const sizeAtribute = attributes.filter(attribute => attribute.name === 'Size')
  const sizes = sizeAtribute.length ? sizeAtribute[0].attribute_values : []

  const handlePageChange = (page) => {
    const { filterQuery, searchQuery } = Helper.getUrlParams(props.history.location.search)
    const searchParam = searchQuery ? searchQuery : '';
    const filterData = filterQuery ? JSON.parse(filterQuery) : { price_range: [0,0], department_ids: [], category_ids: [] }

    let action  = 'PAGINATE'
    if(filterQuery && searchQuery) {
      action = 'ALL_PARAMS'
    } else if (filterQuery && !searchQuery) {
      action = 'PAGINATE_AND_FILTER'
    } else if (!filterQuery && searchQuery) {
      action = 'PAGINATE_AND_SEARCH'
    }

    Helper.setUrl(searchQuery, '/home', props, filterData, page, action)
    changePage(page)
    dispatch(getProducts(page, searchParam, filterData))
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
      const newQuantity = cart.quantity + 1
      const updateParams = {
        item_id: cart.item_id,
        quantity: newQuantity
      }
      dispatch(updateCart(updateParams))
    } else {
      const data = {
        cart_id: cartId,
        product_id: productId,
        attributes: cartAttributes
      }
      dispatch(addCart(data))
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

  useEffect(() => {
    const { pageQuery } = Helper.getUrlParams(props.history.location.search)
    if (pageQuery) {
      changePage(parseInt(pageQuery))
    }
  }, [changePage, props.history.location])

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
          errorMessage={errorMessage}
          cartLoading={cartLoading} /> : null
      }
    </>
  )
};

export default Products;