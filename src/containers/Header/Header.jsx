import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getProducts } from '../../actions/products'
import TopBar from '../../components/Common/TopBar/TopBar'
import { getCartConfig, fetchCart } from '../../actions/cart'
import { getCheckOutData } from '../../actions/config';
import { logoutCustomer } from '../../actions/customers'
import Helper from '../../util/helper'

const PAGE = 1
class Header extends React.Component {
  state = {
    searchQuery: ''
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.history.location.search)
    const searchQuery = params.get('q');
    this.setState({searchQuery: searchQuery})
    this.props.getCartId()
    this.props.getCarts(this.props.cartId)
    this.props.fetchCheckOutData()
  }

  handleSearchValue = (e) => {
    this.setState({searchQuery: e.target.value})
  }

  handleLogout = () => {
    this.props.logout();
  }

  handleSearch = (value) => {
    let { filterQuery } = Helper.getUrlParams(this.props.history.location.search)
    const filterData = filterQuery ? JSON.parse(filterQuery) : { price_range: [0,0], department_ids: [], category_ids: [] }
    let action  = ''
    if(filterQuery && value) {
      action = 'SEARCH_AND_FILTER'
    } else if (filterQuery && !value) {
      action = 'FILTER'
    } else if (!filterQuery && value) {
      action = 'SEARCH'
    }

    Helper.setUrl(value, '/home', this.props, filterData, null, action)
    this.props.getProducts(PAGE, value, filterData)
  }

  render() {
    const now = moment(new Date())
    const next24Hour = this.props.customer.tokenExpIN ? new Date(this.props.customer.tokenExpIN) : null
    const authenticated = now < moment(new Date(next24Hour))
    return (
      <TopBar
        authenticated={authenticated}
        customer={this.props.customer.customer}
        searchQuery={this.state.searchQuery}
        onSearch={this.handleSearch}
        logout={this.handleLogout}
        changeSearch={this.handleSearchValue} 
        totalCart={this.props.totalCart} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (page, word, search) => dispatch(getProducts(page, word, search)),
  getCartId: () => dispatch(getCartConfig()),
  getCarts: (cartId) => dispatch(fetchCart(cartId)),
  fetchCheckOutData: () => dispatch(getCheckOutData()),
  logout: () => dispatch(logoutCustomer())
})

const mapStateToProps = (state) => {
  const { cart, customer } = state
  sessionStorage.setItem('https://omedale-shoppy.netlify.com/token', customer.token);
  return {
    totalCart: cart.carts.length,
    cartId: cart.cartId,
    customer: customer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);