import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem'

const CartList = () => {
  const { carts } =  useSelector(state  => state.cart)

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
                  carts.map((cart, index) => (<CartItem key={index} cart={cart} index={index} />))
                }
              </tbody>
            </table>
          </div>
        )
};

export default CartList;