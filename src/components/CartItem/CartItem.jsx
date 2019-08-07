import React from 'react';
import { Button, Badge } from 'antd'

const CartItem = ({ index, cart }) => (
  <tr>
    <th scope="row">{(index + 1)}</th>
    <td>
    <div className="item-preview">
      <div className="item-image-wrapper">
        <img src={cart.image} alt={cart.name} className="item-thumbnail"/>
      </div>
      <div>
        <h2 className="item-title">{ cart.name }</h2>
      </div>
    </div>
    </td>
    <td>
      {
        (cart.attributes).split(',')[0] ?
        (cart.attributes).split(',').map((attribute, index) =>
        (<Badge
          key={index}
          count={attribute}
          style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}>
        </Badge>))
        : null
      }
    </td>
    <td>{(index + 1)}</td>
    <td>{ cart.discounted_price > 0 ? cart.discounted_price : cart.price }</td>
    <td>
      <Button shape="circle" icon="delete" />
    </td>
  </tr>
);

export default CartItem;