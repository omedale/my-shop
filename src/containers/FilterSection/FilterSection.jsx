import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from '../../components/Common/Filter/Filter';
import { getFilterData } from '../../actions/config';
import { getProducts } from '../../actions/products';
import Helper from '../../util/helper';

const PAGE = 1
class FilterSection extends Component {
  state = {
    maxPrice: 0,
    minPrice: 0,
    filterByDepartmentIds: [],
    filterByCategoryIds: []
  }

  componentDidMount() {
    this.props.fetchFilterData();
    const params = new URLSearchParams(this.props.history.location.search)
    const filterQuery = params.get('filter');
    const searchQuery = params.get('q');
    const searchParam = searchQuery ? searchQuery : '';
    const filterData = filterQuery ? JSON.parse(filterQuery) : { price_range: [0,0], department_ids: [], category_ids: [] }
    this.setState({
      maxPrice: filterData.price_range[1],
      minPrice: filterData.price_range[0],
      filterByDepartmentIds: filterData.department_ids,
      filterByCategoryIds: filterData.category_ids,
    })
    this.props.filterProducts(PAGE, searchParam, filterData)
  }

  handleDepartmentChange = (value) => {
    this.setState({filterByDepartmentIds: value})
  }

  handleCategoryChange = (value) => {
    this.setState({filterByCategoryIds: value})
  }

  handleChangePrice = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFilter = () => {
    const params = new URLSearchParams(this.props.history.location.search)
    const searchQuery = params.get('q');
    const searchParams = searchQuery ? searchQuery : '';
    const filter = {
                      price_range: [this.state.minPrice, this.state.maxPrice],
                      department_ids: this.state.filterByDepartmentIds,
                      category_ids: this.state.filterByCategoryIds
                    }
    Helper.setUrl(searchParams, '/home', this.props, filter)
    this.props.filterProducts(
      PAGE, searchParams,
      filter
    )
  }

  handleResetFilter = () => {
    this.setState({
      filterByDepartmentIds: [],
      filterByCategoryIds: [],
      maxPrice: 0,
      minPrice: 0
    })
  }
  
  render() {
    return (
      <>
        <Filter
          maxPrice={this.state.maxPrice}
          minPrice={this.state.minPrice}
          categories={this.props.categories}
          departments={this.props.departments} 
          departmentChange={this.handleDepartmentChange}
          categoryChange={this.handleCategoryChange}
          defaultDepartment={this.state.filterByDepartmentIds}
          defaultCategory={this.state.filterByCategoryIds}
          changePrice={this.handleChangePrice}
          filterProducts={this.handleFilter}
          resetFilter={this.handleResetFilter}
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilterData: () => dispatch(getFilterData()),
    filterProducts: (page, searchKeys, filterData) => dispatch(getProducts(page, searchKeys, filterData))
  }
}

const mapStateToProps = (state) => {
  const { config } = state
  const { departments, categories } = config
  return {
    departments,
    categories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);