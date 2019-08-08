import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment'

export const useAuth = () => {
  const customerData =  useSelector(state => state.customer)
  const [authenticated, setAuthenticated] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const now = moment(new Date())
    const next24Hour = customerData.tokenExpIN ? new Date(customerData.tokenExpIN) : null
    setAuthenticated(now < moment(new Date(next24Hour)))
  }, [customerData.tokenExpIN]);

  useEffect(() => {
    if (authenticated) {
      setCustomer(customerData.customer)
    } else {
      setCustomer(null)
    }
  }, [authenticated, customerData.customer])

  return [customer, authenticated]
}