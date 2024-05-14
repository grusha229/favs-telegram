import axios from 'axios'

// export const API_URL = 'http://localhost';
export const API_URL = 'https://favs.site/api/v1/'

const api = axios.create({
    withCredentials: false,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    return config;
})

export default api