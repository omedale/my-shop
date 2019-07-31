import React from 'react'
import TopBar from '../../components/Common/TopBar/TopBar'

class Header extends React.Component {
  handleSearchInput = (value) => {
    console.log(value)
  }

  render() {
    return (
      <TopBar onSearch={this.handleSearchInput} />
    );
  }
}

export default Header;