import Api from './api'

export default {
  async order (data) {
    return await Api().post(`api/orders`, data)
  },

  async charge (data) {
    return await Api().post(`api/stripe/charge`, data)
  }
}