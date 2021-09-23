import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3000-aqua-mollusk-ot7e8wqx.ws-us17.gitpod.io/api', 
});

export default api;