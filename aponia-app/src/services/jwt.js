import { http } from './http'

/**
 * @param {String} id User identification value.
 * @param {String} token User token value.
 * @param {Object} user User object. Brings attributes from the table. 
 */
export const setSession = async (id = '', token = '', user = null) => {
  if (token) {
    localStorage.setItem('@id', id)
    localStorage.setItem('@token', token)
    localStorage.setItem('@user', JSON.stringify(user))
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('@id')
    localStorage.removeItem('@token')
    localStorage.removeItem('@user')
    delete http.defaults.headers.common['Authorization']
  }
}