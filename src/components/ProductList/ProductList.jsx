import React from 'react';
import Proptypes from 'prop-types'
import { Pagination } from 'antd'
import ProductItem from '../ProductItem/ProductItem'
import styles from './ProductList.module.scss'

const ProductList = ({ isLoading, products, total, changePage, current, showProduct }) => {
  const pagination  = products.length ? 
    (<div className={ [styles.paginationWrapper, 'row'].join(' ') }>
      <Pagination onChange={changePage} defaultCurrent={current} pageSize={20}  total={total} />
    </div>) : null
  
  const productItems = products.map(product => (
    <ProductItem key={product.product_id} product={product} showDetail={() => showProduct(product.product_id)} />
  ))
  return (
    <div className={styles.products}>
      <div className="row">
        {productItems}
      </div>
      {!isLoading && products.length === 0 ?
        <div className={styles.noProducts}>
          <h2>No available products</h2>
        </div> : null
      }
      { pagination }
    </div>
  );
}

ProductList.propTypes = {
  products: Proptypes.array.isRequired,
  total: Proptypes.number.isRequired,
  changePage: Proptypes.func.isRequired,
  current: Proptypes.number.isRequired,
  isLoading: Proptypes.bool.isRequired
}

export default ProductList;