import bcryptjs from 'bcryptjs';

import Service from "./Service";
import User from 'server/models/User';
import tokenService from './TokenService';
import ApiError from 'server/errors/ApiError';

class UserService extends Service {
    async signUp(email, password) {
        const passwordHash = await bcryptjs.hash(password, 10);
        const user = await this.create({email, password: passwordHash});

        return await tokenService.generateTokens({id: user._id});
    }

    async login(email, password) {
        const user = await this.find({email});
        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) {
            throw ApiError.AuthorizationError();
        }

        return await tokenService.generateTokens({id: user._id});
    }

    async logout(refreshToken) {
        return await tokenService.delete({refreshToken});
    }

    async refresh(refreshToken) {
        const userData = tokenService.validateToken(refreshToken, 'REFRESH');

        if (!userData) {
            throw ApiError.AuthorizationError();
        }

        const token = await tokenService.find({refreshToken});
        const user = await this.find({id: userData.id});

        if (!user || !token) {
            throw ApiError.AuthorizationError();
        }

        return await tokenService.generateTokens({id: user._id});
    }
}

export default new UserService(User);