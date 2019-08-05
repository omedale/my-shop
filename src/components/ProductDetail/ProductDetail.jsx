import React from 'react';
import { Modal, Radio, Button, Alert } from 'antd';
import Proptypes from 'prop-types'
import styles from './ProductDetail.module.scss'

const ProductDetail = ({ 
  size, sizes, setSize, colors, color, setColor, product, visible,
  cancel, addToCart, currentImage, gotoImage, images, isLoading, errorMessage }) => {

  const imageItems = images.map(image => 
      <img onClick={() => {gotoImage(image)}} className={styles.image} key={image} src={image} alt="" />)
  
  const colorItems = colors.map(color => (
    <Radio.Button key={color.value} style={{ background: `${color.value}` }} value={color.value}>&nbsp; &nbsp;</Radio.Button>
  ))

  const sizeItems = sizes.map(size => (
    <Radio.Button key={size.value} value={size.value}>{size.value}</Radio.Button>
  ))

  return (
    <Modal
      width={'580px'}
      title={product.name}
      visible={visible}
      onOk={addToCart}
      onCancel={cancel}
      footer={null}
      >
      <div className="row">
        <div className="col-md-6">
          <div className="text-center">
              <img className={styles.currentImage} src={currentImage} alt="Paris" />
              <div style={{ marginTop: '4px'}} className="text-center"> { imageItems }</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.detailFilterItem}>
            <strong>price:</strong>
            <strong>${product.discounted_price > 0 ? product.discounted_price : product.price}</strong>
          </div>
          <div className={styles.detailFilterItem}>
            <strong>Color</strong>
            <div>
              <Radio.Group onChange={setColor} value={color} size="small">
                {colorItems}
              </Radio.Group>
            </div>
          </div>
          <div className={styles.detailFilterItem}>
            <strong>Size</strong>
            <div>
              <Radio.Group onChange={setSize} value={size} size="small">
                {sizeItems}
              </Radio.Group>
            </div>
          </div>
          <div className={styles.detailFilterItem}>
            <strong>Description</strong>
            <p>{product.description}</p>
          </div>
          { errorMessage ? <Alert message={errorMessage} type="error" showIcon /> : null }
          <div className={styles.detailFilterItem}>
            <Button disabled={isLoading} onClick={() => addToCart(product.product_id)} className={styles.addToCartBtn} type="primary">Add to cart</Button>
            <Button key="back" onClick={cancel}>Return</Button>
          </div>
        </div>
      </div>
    </Modal>)
}

ProductDetail.propTypes = {
  addToCart: Proptypes.func.isRequired
}

export default ProductDetail;