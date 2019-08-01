import React from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/products'
import TopBar from '../../components/Common/TopBar/TopBar'

class Header extends React.Component {

  handleSearchInput = (value) => {
    this.props.getProducts(1, value)
  }

  render() {
    console.log(this.props)
    return (
      <TopBar onSearch={this.handleSearchInput} />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProducts: (page, word) => dispatch(getProducts(page, word))
})

export default connect(null, mapDispatchToProps)(Header);