import React from 'react';
import Filter from '../../components/Common/Filter/Filter'
import Products from '../../components/Products/Products'

class ProductSection extends React.Component {
  render() {
    return (
      <>
        <Filter />
        <Products />
      </>
    )
  }
}

export default ProductSection;