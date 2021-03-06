import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import Proptypes from 'prop-types'
import moment from 'moment'

import { authenticationCustomer } from '../../actions/customers'
import AuthForm from '../../components/Common/AuthForm'


class Authenticator extends React.Component {
  static propTypes = {
    authType: Proptypes.string.isRequired
  }

  static defaultProps = {
    authType: 'LOGIN'
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleAuth(values, this.props.authType)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AuthForm 
        error={this.props.error}
        hasError={this.props.hasError}
        isSuccess={this.props.isSuccess}
        isLoading={this.props.isLoading}
        authType={this.props.authType}
        clicked={this.handleSubmit}
        getFieldDecorator={getFieldDecorator} />
    );
  }
}

const mapStateToProps = (state) => {
  const { customer } = state
  const now = moment(new Date())
  const next24Hour = customer.tokenExpIN ? new Date(customer.tokenExpIN) : null
  return {
    isLoading: customer.isLoading,
    isSuccess: !!customer.customer && !!(now < moment(new Date(next24Hour))),
    hasError: !!customer.error,
    error: customer.error ? customer.error : {}
  }
}

const mapDispatchToProps = dispatch => ({
  handleAuth: (customer, authType) => dispatch(authenticationCustomer(customer, authType))
})

const AuthenticateCustomer = Form.create({ name: 'auth_form' })(Authenticator);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateCustomer);
