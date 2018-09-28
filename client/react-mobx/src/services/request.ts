import axios from 'axios'
import store from '@/store/CurUser'

const server = axios.create({
    timeout: 30000
})

server.interceptors.request.use((config) => {
    if (store.token) {
        config.headers['authorization'] = store.token
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

export default server
