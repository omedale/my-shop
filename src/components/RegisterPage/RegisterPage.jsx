import React from 'react';
import AuthenticateCustomer from '../../containers/customer/AuthenticateCustomer'

const RegisterPage = () => (
  <div className="row">
    <div className="col-sm-6 offset-sm-3 text-center">
      <h1 className="display-4">Register</h1>
      <AuthenticateCustomer authType="REGISTER" />
    </div>
  </div>
)

export default RegisterPage;