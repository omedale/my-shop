import axios from 'axios'

export default () => {
  const token =  sessionStorage.getItem('https://omedale-shoppy.netlify.com/token');
  return axios.create({
    baseURL: `https://omedale-shoppy.herokuapp.com/`,
    headers: {
      'API-KEY': `Bearer ${token}`
    }
  })
}