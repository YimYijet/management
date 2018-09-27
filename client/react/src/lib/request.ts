import axios from 'axios'
import store from '@/store'

const server = axios.create({
    timeout: 30000
})

server.interceptors.request.use((config) => {
    if (store.getState().curUser.token) {
        config.headers['authorization'] = store.getState().curUser.token
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

export default server
