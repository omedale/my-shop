import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import styles from './ProductItem.module.scss'

const ProductItem = ({ product }) => (
  <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div className={styles.product}>
      <div className={styles.productLink}>
          <div className={styles.productImage}>
            <img className="img-responsive" alt={product.name} src={product.image}></img>
          </div>
          <div className={styles.cardProduct}>
            <div className={styles.infoWrap}>
              <Link to="#" className="title">
                <div className={[styles.productName, 'text-center'].join(' ')}>{product.name}</div>
              </Link>
              <div className="price-wrap text-center">
                { product.discounted_price > 0 ? 
                  <span className={[styles.discountedProductPrice, 'price-new '].join(' ')}> ${product.discounted_price}</span> :
                  <span className={[styles.discountedProductPrice, 'price-new '].join(' ')}> ${product.price}</span>
                }
              </div>
            </div>
            <div className="flex-space-between">
              <Button className="pull-left" type="primary" shape="circle" icon="heart" size="small" />
                { product.discounted_price > 0 ?  
                  <span className={[styles.discountedProductPrice, styles.productPrice].join(' ')}> ${ product.price }</span> : null }
              <Button type="primary" className="pull-right" shape="circle" icon="shopping-cart" size="small" />
            </div>
          </div>
      </div>
    </div>
  </div>
)

ProductItem.prototype = {
  product: Proptypes.object.isRequired
}

export default ProductItem;