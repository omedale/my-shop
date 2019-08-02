import React from 'react';
import FilterSection from '../../containers/FilterSection/FilterSection'
import Product from '../../containers/Products/Products'

const HomePage = (props) => (
  <>
    <FilterSection {...props} />
    <Product {...props} />
  </>
)

export default HomePage;