import React from 'react';
import { Button, Icon, Radio } from 'antd'
import { Link } from 'react-router-dom'
import CartList from "../../containers/CartList/CartList";
import './CartPage.module.scss'

const CartPage = (props) => (
  <>
    <div className="cart">
      <h1 className="title">
        Order
      </h1>
    </div>
    <CartList { ...props } />
    <div className="action-buttons-center">
      <Radio.Group>
        <Button className="left-nav-btn" type="primary">
          <Link className="anchor-button" to="/">
            <Icon type="left" />Back to Shop
          </Link>
        </Button>
        <Button className="right-nav-btn" type="primary">
          <Link className="anchor-button " to="/">
            Checkout<Icon type="right" />
          </Link>
        </Button>
      </Radio.Group>
    </div>
  </>
)

export default CartPage;