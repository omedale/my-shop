import Api from './api'

export default {
  async getFilterData () {
    return await Api().get(`api/config/filter-data`)
  },

  async getCheckOutData () {
    return await Api().get(`api/config/checkout-data`)
  }
}