// src/axios.js
import axios from 'axios'

// const instance = axios.create({
//     baseURL: 'http://your-api-domain.com/api',
// })

const api = axios.create({
    baseURL: '/api', // works with your Vite proxy
  })

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api