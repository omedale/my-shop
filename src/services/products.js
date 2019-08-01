import Api from './api'

export default {
  async getProducts (page, filterData = {department_ids: [], category_ids: [], price_range: []}) {
    return await Api().get(`api/products?page=${page}&filter=${JSON.stringify(filterData)}`)
  }
}