import React from 'react'
import { connect } from 'react-redux'
import { searchProducts } from '../../actions/products'
import TopBar from '../../components/Common/TopBar/TopBar'

class Header extends React.Component {

  handleSearchInput = (value) => {
    this.props.searchProducts(1, value)
  }

  render() {
    return (
      <TopBar onSearch={this.handleSearchInput} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchProducts: (page, word) => dispatch(searchProducts(page, word))
})

export default connect(null, mapDispatchToProps)(Header);