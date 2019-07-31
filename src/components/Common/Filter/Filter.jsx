import React from 'react';
import Proptypes from 'prop-types'
import { Select, Button } from 'antd';
import styles from './Filter.module.scss'

const { Option } = Select;

const Filter = (
  { categories, departments, departmentChange, categoryChange,
    defaultDepartment, defaultCategory, defaultPrice }) => {
  const departmentOptions = departments.map(department => <Option key={department.name}>{department.name}</Option>)
  const categoryOptions = categories.map(category => <Option key={category.name}>{category.name}</Option>)
  return (<div className="card">
    <div className={[styles.FilterWrapper, 'card-body'].join(' ')}>
      <div className="row">
        <div className="filter-item">
          <strong>Departments:</strong>
          <div>
            <Select
              mode="multiple"
              style={{ width: '130px' }}
              placeholder="Please select"
              defaultValue={defaultDepartment}
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
              style={{ width: '130px', borderRadius: '12px' }}
              placeholder="Please select"
              defaultValue={defaultCategory}
              onChange={categoryChange}
            >
            {categoryOptions}
          </Select>
          </div>
        </div>
        <div className="filter-item">
          <strong>Price:</strong>
          <div className={styles.priceWrapper}>
            <input min="0" className={[styles.priceInput, 'form-control', 'form-control-sm'].join(' ')} placeholder="Min" type="number"></input>
            <span className="px-2"> - </span>
            <input min="0" className={[styles.priceInput, 'form-control', 'form-control-sm'].join(' ')} placeholder="Max" type="number"></input>
            <Button type="primary" className="ml-2" icon="filter" size="small">
              <span>Filter</span>
            </Button>
            <Button className="ml-2 reset-button" icon="delete" size="small">
              <span>Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

Filter.prototype = {
  categories: Proptypes.array.isRequired,
  departments: Proptypes.array.isRequired,
  attributes: Proptypes.array.isRequired
}

export default Filter;