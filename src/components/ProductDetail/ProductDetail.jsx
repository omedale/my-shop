import React from 'react';
import { Modal } from 'antd';

const ProductDetail = ({ visible, cancel, addToCart }) => (
  <Modal
    title="Basic Modal"
    visible={visible}
    onOk={addToCart}
    onCancel={addToCart}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
)

export default ProductDetail;