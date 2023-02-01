import { http } from '../http'

const BASE_URL = 'medicine'

const getAllMedicines = async () => {
    const { data } = await http.get(`${BASE_URL}`)
    return data?.Data
}

const getMedicine = async (id) => {
    const { data } = await http.get(`${BASE_URL}/${id}`)
    return data?.Data
}

const getMedicinebyCode = async (id) => {
    const { data } = await http.get(`${BASE_URL}/search-code/${id}`)
    return data?.Data
}

const createMedicine = async (user) => {
    const { data } = await http.post(`${BASE_URL}`, user)
    return data
}

const updateMedicine = async (id, user) => {
    const { data } = await http.put(`${BASE_URL}/${id}`, user)
    return data
}

const deleteMedicine = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/${id}`)
    return data
} 

const killMedicine = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/DeleteForever/${id}`)
    return data
} 

module.exports = {
    createMedicine,
    getAllMedicines,
    getMedicine,
    getMedicinebyCode,
    updateMedicine,
    deleteMedicine,
    killMedicine
}