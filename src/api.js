import axios from "axios";

const URL = 'http://localhost:5001'

export async function getProducts() {
    const res = await axios.get(`${URL}/api/products`)   
    
    if (res.status === 200) {
        return res.data
    } else {
        return
    }
}

export async function getProduct(id) {
    const res = await axios.get(`${URL}/api/products/${id}`)   
    
    if (res.status === 200) {
        return res.data
    } else {
        return
    }
}

export async function getProductByCategory(category) {
    const res = await axios.get(`${URL}/category/${category}`)
    
    if (res.status === 200) {
        return res.data
    } else {
        return
    }
}

export async function createProduct(post) {
    const res = await axios.post(`${URL}/api/products`, post)
    return res
}

export async function updateProduct(id, post) {
    const res = await axios.put(`${URL}/api/products/${id}`, post)
    return res
}

export async function deleteProduct(id) {
    const res = await axios.delete(`${URL}/api/products/${id}`)   
    
    return res
}