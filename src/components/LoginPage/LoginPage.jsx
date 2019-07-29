import React from 'react';
import AuthenticateCustomer from '../../containers/customer/AuthenticateCustomer'

const LoginPage = () => (
  <div className="row">
    <div className="col-sm-6 offset-sm-3 text-center">
      <h1 className="display-4">Login</h1>
      <AuthenticateCustomer authType="LOGIN" />
    </div>
  </div>
)

export default LoginPage;