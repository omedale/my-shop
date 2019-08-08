import Api from './api'

export default {
  async addCart (data) {
    return await Api().post(`api/shoppingcart/add`, data)
  },

  async updateCart (data) {
    return await Api().put(`api/shoppingcart/update/${data.item_id}`, data)
  },

  async getCartID () {
    return await Api().get(`api/shoppingcart/generateUniqueId`)
  },

  async getAllCartItem (cartId) {
    return await Api().get(`api/shoppingcart/${cartId}`)
  },

  async removeProduct (itemId) {
    return await Api().delete(`api/shoppingcart/removeProduct/${itemId}`)
  }
}