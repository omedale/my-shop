import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styles from './LoginPage.module.scss'

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-center">
          <h1 className="display-4">Login</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
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
              <Button type="primary" htmlType="submit" className={['login-form-button', styles.loginButton].join(" ")}>
                Log in
              </Button>
          </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginPage = Form.create({ name: 'login_form' })(LoginForm);
export default LoginPage;
