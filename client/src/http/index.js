import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', //TODO: Move to config
});

export default api;