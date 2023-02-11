import { http } from '../http'

const BASE_URL = 'inventory'

const getAllInventories = async () => {
    const { data } = await http.get(`${BASE_URL}`)
    return data?.Data
}

const getInventoryList = async (body = {}) => {
    const { data } = await http.post(`${BASE_URL}/inventoryList`, body)
    return data?.Data
}

const getInventoryQty = async (body = {}) => {
    const { data } = await http.post(`${BASE_URL}/inventoryPages`, body)
    return data?.Data
}

const getInventory = async (sid, mid) => {
    const { data } = await http.get(`${BASE_URL}/${sid}/${mid}`)
    return data?.Data
}

const createInventory = async (inv) => {
    const { data } = await http.post(`${BASE_URL}`, inv)
    return data
}

const updateInventory = async (id, inv) => {
    const { data } = await http.put(`${BASE_URL}/${id}`, inv)
    return data
}

const deleteInventory = async (sid,mid) => {
    const { data } = await http.delete(`${BASE_URL}/${sid}/${mid}`)
    return data
} 

const killLab = async (id) => {
    const { data } = await http.delete(`${BASE_URL}/DeleteForever/${id}`)
    return data
} 

export {
    createInventory,
    getAllInventories,
    getInventory,
    getInventoryList,
    getInventoryQty,
    updateInventory,
    deleteInventory,
    killLab
}
