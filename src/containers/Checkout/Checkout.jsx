import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import  { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'
import CheckoutCart from '../../components/CheckoutCart/CheckoutCart'
import { updateCustomerAddress } from '../../actions/customers'
import Helper from '../../util/helper'
import { createCustomerOrder } from '../../actions/order'


const Checkout = (props) => {
  const dispatch = useDispatch()

  const [shippingFee, setShippingFee] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [shippings, setShipping] = useState([]);
  const [shippingId, setShippingId] = useState(null);
  const [currentTaxRate, setTaxRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const stripeButton = React.createRef()

  const { isLoading } = useSelector(state  => state.order)
  const { tax } =  useSelector(state  => state.config)
  const { carts, cartId } =  useSelector(state  => state.cart)
  const { customer } = useSelector(state => state.customer)
  const regions = useSelector(state => state.config.shipping_regions)

  const handleCheckout = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        updateAddress(values)
        stripeButton.current.onClick()
      }
    });
  }

  const updateAddress = (values) => {
    const regionData = JSON.parse(values.region)
    const customerAddress = {
      shippingId: values.shipping,
      address_1: values.address,
      address_2: values.address2,
      city: values.city,
      region: regionData.shipping_region,
      postal_code: values.zip,
      country: values.country,
      shipping_region_id: regionData.shipping_region_id
    }
    dispatch(updateCustomerAddress(customerAddress))
  }

  const handleRegionChange = (regionData) => {
    const region = JSON.parse(regionData)
    setShipping(region.shippings)
  }

  const onToken = (token, addresses) => {
    const data = {
      cart_id: cartId,
      shipping_id: shippingId,
      tax_id: tax.length > 1 ? parseInt(tax[0].tax_id): null
    }
    dispatch(createCustomerOrder(data, token, totalAmount))
  };

  const handleShippingChange = (value) => {
    const shipping = JSON.parse(value)
    setShippingFee(shipping.shipping_cost)
    setShippingId(shipping.shipping_id)
  }

  useEffect(() => {
    setTaxRate(tax.length > 1 ? parseInt(tax[0].tax_percentage): 0)
    if (customer) {
      setEmail(customer.email)
      setName(customer.name)
      setAddress(customer.address_1)
      setAddress2(customer.address_2)
      setPostalCode(customer.postal_code)
      setCity(customer.city)
      setCountry(customer.country)
    }
    setTotalAmount(Helper.getTotal(0, shippingFee, carts, currentTaxRate).getAmount())
  }, [setTaxRate, tax, customer, currentTaxRate, carts, shippingFee])
  

  const { getFieldDecorator } = props.form;
  return (
    <>
    {
      carts.length < 1 ? <Redirect to="/home" /> :
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <CheckoutCart
              shippingFee={shippingFee}
              currentTaxRate={currentTaxRate}
              carts={carts}
            />
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <CheckoutForm
              name={name}
              email={email}
              address={address}
              address2={address2}
              city={city}
              country={country}
              regionChange={handleRegionChange}
              regions={regions}
              shippingChange={handleShippingChange}
              shippingFee={shippingFee}
              shippings={shippings}
              postalCode={postalCode}
              checkoutCart={handleCheckout}
              getFieldDecorator={getFieldDecorator}
              isLoading={isLoading}
              onToken={onToken}
              stripeButton={stripeButton}
              setShippingId={setShippingId}
              amount={totalAmount}
            />
          </div>
        </div>
      </div>
    }
    </>
  )
};


export default Form.create({ name: 'checkout_form' })(Checkout);