import React from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/products'
import TopBar from '../../components/Common/TopBar/TopBar'
import { getCartConfig, fetchCart } from '../../actions/cart'
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
  }

  handleSearchValue = (e) => {
    this.setState({searchQuery: e.target.value})
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
    return (
      <TopBar searchQuery={this.state.searchQuery} onSearch={this.handleSearch} changeSearch={this.handleSearchValue} totalCart={this.props.totalCart} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (page, word, search) => dispatch(getProducts(page, word, search)),
  getCartId: () => dispatch(getCartConfig()),
  getCarts: (cartId) => dispatch(fetchCart(cartId)),
})

const mapStateToProps = (state) => {
  const { cart } = state
  return {
    totalCart: cart.carts.length,
    cartId: cart.cartId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);