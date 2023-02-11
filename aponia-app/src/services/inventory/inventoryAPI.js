import { http } from '../http'

const BASE_URL = 'laboratory'

const getAllLabs = async () => {
    const { data } = await http.get(`${BASE_URL}`)
    return data?.Data
}

const getLab = async (id) => {
    const { data } = await http.get(`${BASE_URL}/${id}`)
    return data?.Data
}

const getLabRIF = async (id) => {
    const { data } = await http.get(`${BASE_URL}/search-iden/${id}`)
    return data?.Data
}

const createLab = async (user) => {
    const { data } = await http.post(`${BASE_URL}`, user)
    return data
}

const updateLab = async (id, user) => {
    const { data } = await http.put(`${BASE_URL}/${id}`, user)
    return data
}

const deleteLab = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/${id}`)
    return data
} 

const killLab = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/DeleteForever/${id}`)
    return data
} 

export {
    createLab,
    getAllLabs,
    getLab,
    getLabRIF,
    updateLab,
    deleteLab,
    killLab
}
