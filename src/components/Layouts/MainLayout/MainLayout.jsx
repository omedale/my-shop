import React from "react";
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => (
  <>
   <h2 className={styles.error}>Main Layout</h2>
    {children}
  </>
);

export default MainLayout;
