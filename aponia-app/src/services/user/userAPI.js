import { http } from '../http'

const BASE_URL = 'user'

const getAllUsers = async () => {
    const { data } = await http.get(`${BASE_URL}`)
    return data?.Data
}

const getUser = async (id) => {
    const { data } = await http.get(`${BASE_URL}/${id}`)
    return data?.Data
}

const getUserbyIdentification = async (id) => {
    const { data } = await http.get(`${BASE_URL}/search-iden/${id}`)
    return data?.Data
}

const createUser = async (user) => {
    const { data } = await http.post(`${BASE_URL}`, user)
    return data
}

const updateUser = async (id, user) => {
    const { data } = await http.put(`${BASE_URL}/${id}`, user)
    return data
}

const deleteUser = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/${id}`)
    return data
} 

const killUser = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/DeleteForever/${id}`)
    return data
} 

export {
    createUser,
    getAllUsers,
    getUser,
    getUserbyIdentification,
    updateUser,
    deleteUser,
    killUser
}
