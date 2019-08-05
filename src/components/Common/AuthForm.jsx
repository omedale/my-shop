import React from 'react';
import  { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Alert } from 'antd';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const AuthForm = ({ error, hasError, isSuccess, isLoading, authType, clicked, getFieldDecorator }) => {
  if (isSuccess) {
    return <Redirect to='/home'  />
  }
  return (<>
    { hasError ? <Alert message={error.message} type="error" />  : null}
    <Form onSubmit={clicked} className="login-form">
      { authType === 'REGISTER' ?
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: 'Please input your name!' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
            />,
          )}
        </Form.Item> : null
      }
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'The input is not valid Email!',
            },
          ],
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button disabled={isLoading} type="primary" htmlType="submit" className={['login-form-button', 'fullLenghtButton'].join(" ")}>
        { authType === 'REGISTER' ? 'Register' :'Log in' }
        </Button>
        { authType === 'REGISTER' ? 
          (<Link to="/login"> I already have an account</Link>) :
          (<Link to="/register"> I don't have an account</Link>)
        }
      </Form.Item>
    </Form>
  </>)
}

AuthForm.propTypes = {
  clicked: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  authType: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired
}

export default AuthForm;