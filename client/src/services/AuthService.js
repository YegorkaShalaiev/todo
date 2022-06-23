import api from '../http';

export default class AuthService {
    static async signUp(data) {
        return api.post('/auth/sign-up', data)
            .then(res => res.data)
            .catch(e => e.response.data);
    };

    static async login(data) {
        return api.post('/auth/login', data)
            .then(res => res.data)
            .catch(e => {
                return e.response.data.errors ? e.response.data : {error: e.response.data};
            });
    };

    static async logout() {
        return api.post('/auth/logout');
    }
}