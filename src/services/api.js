import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://omedale-shop.herokuapp.com/`,
    headers: {
      'API-KEY': `Bearer Token`
    }
  })
}