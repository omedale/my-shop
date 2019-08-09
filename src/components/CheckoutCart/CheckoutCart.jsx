import React from 'react';
import Helper from '../../util/helper'

const CheckoutCart = ({ carts, shippingFee, currentTaxRate }) => (
  <>
     <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Your cart</span>
      <span className="badge badge-secondary badge-pill">{ carts.length }</span>
    </h4>
    <ul className="list-group mb-3">
      { carts.map(item =>
        <li key={item.item_id} className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">{ item.name }</h6>
            <small className="text-muted">Quantity ({ item.quantity })</small>
          </div>
          <span  className="text-muted">
            { item.discounted_price > 0 ? Helper.toPrice(item.discounted_price).toFormat() : Helper.toPrice(item.price).toFormat() }
          </span>
        </li>)
      }
      <li className="list-group-item d-flex justify-content-between">
        <span>Tax</span>
        <strong>{ Helper.getTaxAmount(carts, currentTaxRate).toFormat() }</strong>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Shipping fee</span>
        <strong>$ { shippingFee }</strong>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Total</span>
        <strong>{  Helper.getTotal(0, shippingFee, carts, currentTaxRate).toFormat() }</strong>
      </li>
    </ul>
  </>
);

export default CheckoutCart;