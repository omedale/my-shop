import React from 'react';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
const { Option } = Select;

const CheckoutForm = ({ name, email, address, address2, city, country, regionChange, regionId, regions, shippingChange,
                       shippings, postalCode, checkoutCart, getFieldDecorator, isLoading }) => {

  const regionOptions = regions.map((region, index) => <Option value={region.shipping_region_id} key={region.shipping_region_id} >{region.shipping_region}</Option>)
  const shippingOptions = shippings.map(shipping => <Option value={shipping.shipping_cost} key={shipping.shipping_id}>{shipping.shipping_type}</Option>)
 
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
            <Button type="primary">
              Place order
            </Button>
          </div>
        </Form.Item>
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