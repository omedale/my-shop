import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';  
import './App.css';

import AuthLayoutRoute from './components/Layouts/AuthLayout/AuthLayoutRoute'
import MainLayoutRoute from './components/Layouts/MainLayout/MainLayoutRoute'

import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import CartPage from './components/CartPage/CartPage'
import RegisterPage from './components/RegisterPage/RegisterPage'


const App = () => {
  return (
    <Router>
      <Switch>
          <Route exact path="/">  
            <Redirect to="/home" />  
          </Route>
          <AuthLayoutRoute path="/login" component={LoginPage} />  
          <AuthLayoutRoute path="/register" component={RegisterPage} />  
          <MainLayoutRoute path="/home" component={HomePage} />
          <MainLayoutRoute path="/cart" component={CartPage} />
      </Switch>
    </Router>
  );
}

export default App;
