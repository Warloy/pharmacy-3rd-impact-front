import axios from 'axios'

export const BASE_URL = 'https://pharmacy-3rd-impact-back-production.up.railway.app/api/'

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const getConnection = async () => {
  const { data, status } = await http.get('/', {
    validateStatus: status => {
      return status < 500
    }
  })
  return { data, status }
}

