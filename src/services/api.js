import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://omedale-shoppy.herokuapp.com/`,
    headers: {
      'API-KEY': `Bearer Token`
    }
  })
}