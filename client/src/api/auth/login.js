import api from '../index';

export const login = data => api.post('/auth/login', data)
    .then(res => res.data)
    .catch(e => e.response.data);