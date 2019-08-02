import React from 'react';
import Proptypes from 'prop-types'
import { Select, Button } from 'antd';
import styles from './Filter.module.scss'

const { Option } = Select;

const Filter = (
  { maxPrice, minPrice, categories, departments, departmentChange, categoryChange,
    defaultDepartment, defaultCategory, changePrice, filterProducts, resetFilter}) => {
      
  const departmentOptions = departments.map(department => <Option value={department.department_id} key={department.name}>{department.name}</Option>)
  const categoryOptions = categories.map(category => <Option value={category.category_id} key={category.name}>{category.name}</Option>)

  const showResetButton = maxPrice > 0 || minPrice > 0 || defaultCategory.length || defaultDepartment.length
  
  return (<div className="card">
    <div className={[styles.FilterWrapper, 'card-body'].join(' ')}>
      <div className="row">
        <div className="filter-item">
          <strong>Departments:</strong>
          <div>
            <Select
              mode="multiple"
              style={{ minWidth: '130px' }}
              placeholder="Please select"
              value={defaultDepartment}
              onChange={departmentChange}
            >
            {departmentOptions}
          </Select>
          </div>
        </div>
        <div className="filter-item">
          <strong>Category:</strong>
          <div>
            <Select
              mode="multiple"
              style={{ minWidth: '130px' }}
              placeholder="Please select"
              value={defaultCategory}
              onChange={categoryChange}
            >
            {categoryOptions}
          </Select>
          </div>
        </div>
        <div className="filter-item">
          <strong>Price:</strong>
          <div className={styles.priceWrapper}>
            <input value={minPrice} min="0" onChange={changePrice} name="minPrice" className={[styles.priceInput, 'form-control', 'form-control-sm'].join(' ')} placeholder="Min" type="number"></input>
            <span className="px-2"> - </span>
            <input value={maxPrice} min="0" onChange={changePrice} name="maxPrice" className={[styles.priceInput, 'form-control', 'form-control-sm'].join(' ')} placeholder="Max" type="number"></input>
            <Button onClick={filterProducts} type="primary" className="ml-2" icon="filter" size="small">
              <span>Filter</span>
            </Button>
            { showResetButton ?
              <Button onClick={resetFilter} className="ml-2 reset-button" icon="delete" size="small">
                <span>Reset</span>
              </Button> : null
            }
          </div>
        </div>
      </div>
    </div>
  </div>)
}

Filter.prototype = {
  categories: Proptypes.array.isRequired,
  departments: Proptypes.array.isRequired,
  attributes: Proptypes.array.isRequired,
  maxPrice: Proptypes.number.isRequired,
  minPrice: Proptypes.number.isRequired,
  changePrice: Proptypes.func.isRequired,
  filterProducts: Proptypes.func.isRequired,
  resetFilter: Proptypes.func.isRequired,
}

export default Filter;