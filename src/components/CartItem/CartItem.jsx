import React from 'react';
import { Button, Badge, Row, Col, Input} from 'antd'
import styles from './CartItem.module.scss'

const CartItem = ({ index, cartItem, updateCart, cartLoading, deleteCartItem }) => (
  <tr>
    <th scope="row">{(index + 1)}</th>
    <td>
    <div className="item-preview">
      <div className="item-image-wrapper">
        <img src={cartItem.image} alt={cartItem.name} className="item-thumbnail cart-item-image"/>
      </div>
      <div>
        <h2 className="item-title">{ cartItem.name }</h2>
      </div>
    </div>
    </td>
    <td>
      <div className="vertical-align-cart-item">
        {
          (cartItem.attributes).split(',')[0] ?
          (cartItem.attributes).split(',').map((attribute, index) =>
          (<Badge
            key={index}
            count={attribute}
            style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}>
          </Badge>))
          : null
        }
      </div>
    </td>
    <td>
      <Row className="vertical-align-cart-item" size="small">
        <Col span={3}>
          <Button disabled={cartLoading} onClick={() => updateCart(cartItem.item_id, -1)} shape="circle" icon="minus" size="small" />
        </Col>
        <Col className={[styles.quantityInput, 'mr-2', 'ml-2'].join(' ')} span={6}>
          <Input className="quantity" size="small" disabled={true} value={cartItem.quantity} type="number" min="0" defaultValue={0} />
        </Col>
        <Col span={3}>
          <Button disabled={cartLoading} onClick={() => updateCart(cartItem.item_id, 1)} shape="circle" icon="plus" size="small" />
        </Col>
      </Row>
    </td>
    <td><div className="vertical-align-cart-item">{ cartItem.discounted_price > 0 ? cartItem.discounted_price : cartItem.price }</div></td>
    <td>
      <div className="vertical-align-cart-item"><Button onClick={() => deleteCartItem(cartItem.item_id)} shape="circle" icon="delete" /></div>
    </td>
  </tr>
);

export default CartItem;