import React from 'react';
import { connect } from 'react-redux';
import Filter from '../../components/Common/Filter/Filter'
import { getFilterData } from '../../actions/config'

class FilterSection extends React.Component {

  componentDidMount() {
    this.props.fetchFilterData();
  }

  handleDepartmentChange = (value) => {
    console.log(value)
  }

  handleCategoryChange = (value) => {
    console.log(value)
  }
  
  render() {
    return (
      <>
        <Filter
          categories={this.props.categories}
          departments={this.props.departments} 
          departmentChange={this.handleDepartmentChange}
          categoryChange={this.handleCategoryChange}
          defaultDepartment={this.props.defaultDepartment}
          defaultCategory={this.props.defaultDepartment}
          defaultPrice={this.props.defaultPrice}
        />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilterData: () => dispatch(getFilterData())
  }
}

const mapStateToProps = (state) => {
  const { config } = state
  const { departments, categories } = config
  return {
    departments,
    categories,
    defaultDepartment: [],
    defaultCategory: [],
    defaultPrice: [0,0]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);