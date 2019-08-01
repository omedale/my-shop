import React from "react";
import styles from './MainLayout.module.css';

import Header from '../../../containers/Header/Header';
import Footer from '../../Common/Footer';

const MainLayout = ({ children }) => (
  <div className={styles.mainApp}>
    <Header {...children.props} />
    <div className={[styles.mainContent, 'container'].join(' ')}>{children}</div>
    <Footer />
  </div>
);

export default MainLayout;
