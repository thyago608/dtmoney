import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3000-green-vulture-s4gu9p7x.ws-us15.gitpod.io/api', 
});

export default api;