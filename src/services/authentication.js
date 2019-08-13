import Api from './api'

export default {
  async login (data) {
    return await Api().post(`api/customer/login`, data)
  },
  async register (data) {
    return await Api().post(`api/customer`, data)
  },
  async updateAddress (data) {
    return await Api().put(`api/customers/address`, data)
  }
}