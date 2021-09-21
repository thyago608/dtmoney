import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3000-blue-goat-xgbyjp5g.ws-us15.gitpod.io/api', 
});

export default api;