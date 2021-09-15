import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3000-magenta-bat-bhk7juku.ws-us15.gitpod.io/api', 
});

export default api;