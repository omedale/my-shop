import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem'
import { updateCart, removeCartItem } from '../../actions/cart'
import Helper from '../../util/helper'

const CartList = () => {
  const dispatch = useDispatch()
  const { carts, cartLoading } =  useSelector(state  => state.cart)
  const { tax } =  useSelector(state  => state.config)
  const [currentTaxRate, setTaxRate] = useState(0);

  const handleUpdateCart = (cartItemId, quantity) => {
    const item = carts.find(cart => (parseInt(cart.item_id) === parseInt(cartItemId)))
    if (item) {
      const newQuantity = quantity + item.quantity
      if (newQuantity <= 0) {
        dispatch(removeCartItem(cartItemId))
      } else {
        const updateParams = {
          item_id: cartItemId,
          quantity: newQuantity
        }
        dispatch(updateCart(updateParams))
      }
    }
  }

  const handleDeleteCartItem = (itemId) => {
    dispatch(removeCartItem(itemId))
  }

  useEffect(() => {
    setTaxRate(tax.length > 1 ? parseInt(tax[0].tax_percentage): 0)
  }, [setTaxRate, tax])

  return(
          <div className="table-wrapper">
            <table className="table table-borderless text-nowrap">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Attributes</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                { 
                  carts.map((item, index) => (
                    <CartItem
                      key={index}
                      updateCart={handleUpdateCart}
                      deleteCartItem={handleDeleteCartItem}
                      cartItem={item}
                      cartLoading={cartLoading}
                      index={index} />))
                }
                <tr>
                  <th scope="row"></th>
                  <td><h3 className="cart-line">Subtotal</h3></td>
                  <td></td>
                  <td></td>
                  <td><span className="cart-price"> { Helper.getSubtotal(carts).toFormat() }</span></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td><h3 className="cart-line"> Tax ({ currentTaxRate }%)</h3></td>
                  <td></td>
                  <td></td>
                  <td> <span className="cart-price">{ Helper.getTaxAmount(carts, currentTaxRate).toFormat() }</span></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td><h3 className="cart-line"> Total</h3></td>
                  <td></td>
                  <td></td>
                  <td> <span className="cart-price">{ Helper.getTotal(0, 0, carts, currentTaxRate).toFormat() }</span></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )
};

export default CartList;