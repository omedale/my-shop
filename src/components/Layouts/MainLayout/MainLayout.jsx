import React from "react";
import  { Redirect } from 'react-router-dom'
import styles from './MainLayout.module.css';
import Header from '../../../containers/Header/Header';
import Footer from '../../Common/Footer';
import { useAuth } from '../../../AuthService/useAuth'
const PROTECTED_ROUTES = [
  '/checkout'
]

const MainLayout = ({ children }) => {
  const [customer, authenticated] = useAuth();

  const url = children.props.match.url
  return (
      PROTECTED_ROUTES.includes(url) && !authenticated && !customer ?
      <Redirect to="/login" />  :
      <div className={styles.mainApp}>
        <Header {...children.props} />
        <div className={[styles.mainContent, 'container'].join(' ')}>{children}</div>
        <Footer />
      </div>
    )
};

export default MainLayout;
