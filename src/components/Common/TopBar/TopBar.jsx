import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Badge, Avatar } from 'antd';
import styles from './TopBar.module.scss'

const { Search } = Input;

const topbar = ({ searchQuery, onSearch, changeSearch, totalCart }) => (<section className={styles.headerWrapper}>
  <div className="container">
    <div className="row text-center">
      <div className={styles.navWrapper}>
        <div>
          <Link to="/" className="appLogo py-1"><h3>My Shop</h3></Link>
        </div>
        <div>
          <Search
            value={searchQuery}
            onChange={changeSearch}
            placeholder="input search text"
            onSearch={value => onSearch(value)}
            className={styles.searchBar}
          />
        </div>
        <div>
          <div className={[styles.customerWrap, 'py-1'].join(" ")}>
          <span className="py-1">Hi</span>
          { true ? 
          <span>
            <span className={[styles.customerName, 'py-1'].join(" ")}>Medale</span> |
            <span className={[styles.customerName, 'py-1', 'logout'].join(" ")}>Logout</span>
          </span>
          :
          <span>
            |
            <span><Link to="/login" className="">Login</Link></span> or
            <span><Link to="/register" className="">Register</Link></span>
          </span>
          }
          <span className="no-gutters cart py-1">
            <Link to="/cart" className="">
                <span>
                  <Badge count={totalCart}><Avatar shape="square" icon="shopping-cart" /></Badge>
                </span>
            </Link>
          </span>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>)

export default topbar;