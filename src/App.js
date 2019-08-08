import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './store/configureStore'
import './App.css';

import AuthLayoutRoute from './components/Layouts/AuthLayout/AuthLayoutRoute'
import MainLayoutRoute from './components/Layouts/MainLayout/MainLayoutRoute'

import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import CartPage from './components/CartPage/CartPage'
import CheckoutPage from './components/CheckoutPage/CheckoutPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

const { persistor, store } = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        >
        <Router>
          <Switch>
              <Route exact path="/">  
                <Redirect to="/home" />  
              </Route>
              <AuthLayoutRoute path="/login" component={LoginPage} />  
              <AuthLayoutRoute path="/register" component={RegisterPage} />  
              <MainLayoutRoute path="/home" component={HomePage} />
              <MainLayoutRoute path="/cart" component={CartPage} />
              <MainLayoutRoute path="/checkout" component={CheckoutPage} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
