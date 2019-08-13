import React from 'react';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'react-router-dom'
import styles from './CheckoutForm.module.scss'
const { Option } = Select;

const CheckoutForm = ({ name, email, address, address2, city, country, regionChange, regions, shippingChange,
                       shippings, postalCode, checkoutCart, getFieldDecorator, isLoading, onToken, stripeButton, amount }) => {

  const regionOptions = regions.map((region, index) => <Option value={JSON.stringify(region)} key={region.shipping_region_id} >{region.shipping_region}</Option>)
  const shippingOptions = shippings.map(shipping => <Option value={JSON.stringify(shipping)} key={shipping.shipping_id}>{shipping.shipping_type}</Option>)
 
  return (
    <Form onSubmit={checkoutCart} className="login-form">
        <Form.Item
          label="Name">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [
              { required: true, message: 'Please input your name!' }
            ],
          })(
            <Input
              placeholder="Medale Oluwafemi"
            />,
          )}
        </Form.Item>
        <Form.Item
          label="Email">
          {getFieldDecorator('email', {
            initialValue: email,
            rules: [
              { required: true, message: 'Please input your email!' },
              {
                type: 'email',
                message: 'The input is not valid Email!',
              },
            ],
          })(
            <Input
              placeholder="omedale@gmail.com"
            />,
          )}
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Address">
              {getFieldDecorator('address', {
                initialValue: address,
                rules: [
                  { required: true, message: 'Please input your address!' }
                ],
              })(
                <Input
                  placeholder="23 Suxxess pile way"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address 2 (optional)">
              {getFieldDecorator('address2', {
                initialValue: address2,
              })(
                <Input
                  placeholder="Apartment or Flat"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="City">
              {getFieldDecorator('city', {
                initialValue: city,
                rules: [
                  { required: true, message: 'Please input your city!' }
                ],
              })(
                <Input
                  placeholder="New York"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Country">
              {getFieldDecorator('country', {
                initialValue: country,
                rules: [
                  { required: true, message: 'Please input your country!' }
                ],
              })(
                <Input
                  placeholder="USA"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              label="Region">
              {getFieldDecorator('region', {
                rules: [{ required: true, message: 'Please select your region!' }],
              })(
                <Select
                      placeholder="Please select"
                      onChange={regionChange}
                    >
                    {regionOptions}
                </Select>)
              }
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Shipping">
              {getFieldDecorator('shipping', {
                rules: [{ required: true, message: 'Please select your shipping!' }],
              })(
                <Select
                    placeholder="Please select"
                    onChange={(value) => shippingChange(value)}
                  >
                  {shippingOptions}
                </Select>)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Postal Code">
              {getFieldDecorator('zip', {
                initialValue: postalCode,
                rules: [
                  { required: true, message: 'Please input your postal code!' }
                ],
              })(
                <Input
                  placeholder="20187"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="action-buttons-space-between">
            <Button type="primary">
              <Link className="anchor-button " to="/cart">
                Back to cart
              </Link>
            </Button>
            <Button disabled={isLoading} htmlType="submit" type="primary">
              Place order
            </Button>
          </div>
        </Form.Item>
        <StripeCheckout
          className={styles.checkOutStyle}
          amount={amount}
          description="Awesome Product"
          image="https://fakeimg.pl/80x80"
          locale="auto"
          name="Omedale Shoppy"
          email={email}
          stripeKey="pk_test_J3pjN4atklongAk7bZf8ceqJ00kTG38jww"
          token={onToken}
          zipCode
          ref={stripeButton}
        />
      </Form>)
  };

  CheckoutForm.defaultProps = {
    postalCode: '',
    country: '',
    city: '',
    name: '',
    email: '',
    address: '',
    address2: ''
  }

export default CheckoutForm;