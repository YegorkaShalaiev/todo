import api from '../index';

export const login = data => api.post('/auth/login', data)
    .then(res => res.data)
    .catch(e => {
        return e.response.data.errors ? e.response.data : {error: e.response.data};
    });