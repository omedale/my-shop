import React from "react";
import { Layout } from 'antd';
import { Link } from "react-router-dom";
import styles from './AuthLayout.module.scss';
const { Content } = Layout

const AuthLayout = ({ children }) => (
  <>
    <Layout>
      <Content>
        <div className={styles.layout}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Link className="default-anchor" to="/">
                Home
              </Link>
            </div>
          </div>
          <div className={styles.content}>
            {children }
          </div>
          <div className={[styles.footer, styles.footerCenter].join(" ")}>
            <p>&copy; 2019 Omedale. All rights reserved.</p>
          </div>
        </div>
      </Content>
    </Layout>
  </>
);

export default AuthLayout;
