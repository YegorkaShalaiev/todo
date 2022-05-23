import api from '../index';

export const signUp = data => api.post('/auth/sign-up', data)
    .then(res => res.data)
    .catch(e => e.response.data);
