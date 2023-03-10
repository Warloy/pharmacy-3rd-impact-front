import { http } from '../http'

const BASE_URL = 'office'

const getAllOffices = async () => {
    const { data } = await http.get(`${BASE_URL}`)
    return data?.Data
}

const getOffice = async (id) => {
    const { data } = await http.get(`${BASE_URL}/${id}`)
    return data?.Data
}

const getOfficebyCode = async (id) => {
    const { data } = await http.get(`${BASE_URL}/search-code/${id}`)
    return data?.Data
}

const createOffice = async (office) => {
    const { data } = await http.post(`${BASE_URL}`, office)
    return data
}

const updateOffice = async (id, office) => {
    const { data } = await http.put(`${BASE_URL}/${id}`, office)
    return data
}

const deleteOffice = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/${id}`)
    return data
} 

const killOffice = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/DeleteForever/${id}`)
    return data
} 

export {
    createOffice,
    getAllOffices,
    getOffice,
    getOfficebyCode,
    updateOffice,
    deleteOffice,
    killOffice
}