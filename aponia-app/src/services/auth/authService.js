import { http } from '../http'

const BASE_URL = 'user'

export const login = async (payload = { email: null, password: null }) => {
  const { data } = await http.post(`${BASE_URL}/login`, payload)
  return data || null
}