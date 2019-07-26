import React from "react";
import styles from './AuthLayout.module.css';

const AuthLayout = ({ children }) => (
  <>
   <h2 className={styles.error}>Auth Layout</h2>
    {children}
  </>
);

export default AuthLayout;
