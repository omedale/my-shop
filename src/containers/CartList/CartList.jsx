import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem'
import { updateCart, removeCartItem } from '../../actions/cart'

const CartList = () => {
  const dispatch = useDispatch()
  const { carts, cartLoading } =  useSelector(state  => state.cart)

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
              </tbody>
            </table>
          </div>
        )
};

export default CartList;