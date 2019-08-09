import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useSelector } from 'react-redux'
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'
import CheckoutCart from '../../components/CheckoutCart/CheckoutCart'

const Checkout = (props) => {
  const [regionId, setRegionId] = useState(null)
  const [shippingFee, setShippingId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [shippings, setShipping] = useState([]);
  const [currentTaxRate, setTaxRate] = useState(0);

  const { tax } =  useSelector(state  => state.config)
  const { carts } =  useSelector(state  => state.cart)
  const regions = useSelector(state => state.config.shipping_regions)

  const handleCheckout = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  const handleRegionChange = (regionId) => {
    const selectedRegion =  regions.find(region => parseInt(region.shipping_region_id) === parseInt(regionId))
    setShipping(selectedRegion.shippings)
  }

  useEffect(() => {
    setTaxRate(tax.length > 1 ? parseInt(tax[0].tax_percentage): 0)
  }, [setTaxRate, tax])

  const { getFieldDecorator } = props.form;
  return (
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
            regionId={regionId}
            regions={regions}
            shippingChange={setShippingId}
            shippingFee={shippingFee}
            shippings={shippings}
            postalCode={postalCode}
            checkoutCart={handleCheckout}
            getFieldDecorator={getFieldDecorator}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  )
};

export default Form.create({ name: 'checkout_form' })(Checkout);