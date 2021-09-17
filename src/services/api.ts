import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3000-teal-donkey-1kn9xg83.ws-us15.gitpod.io/api', 
});

export default api;