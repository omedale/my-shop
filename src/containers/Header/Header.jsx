import React from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/products'
import TopBar from '../../components/Common/TopBar/TopBar'
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
  }

  handleSearchValue = (e) => {
    this.setState({searchQuery: e.target.value})
  }

  handleSearch = (value) => {
    Helper.setUrl(value, '/home', this.props)
    this.props.getProducts(PAGE, value)
  }

  render() {
    return (
      <TopBar searchQuery={this.state.searchQuery} onSearch={this.handleSearch} changeSearch={this.handleSearchValue} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (page, word) => dispatch(getProducts(page, word))
})

export default connect(null, mapDispatchToProps)(Header);