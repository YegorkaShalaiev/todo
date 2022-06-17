import jwt from 'jsonwebtoken';
import config from 'config';

import Service from './Service';
import Token from 'server/models/Token';

class TokenService extends Service {
    async generateTokens(payload) {
        const accessToken = this.generateToken(payload, 'ACCESS');
        const refreshToken = this.generateToken(payload, 'REFRESH');

        await this.saveRefreshToken(payload.id, refreshToken);

        return {accessToken, refreshToken};
    }

    generateToken(payload, type) {
        return jwt.sign(
            payload,
            config.get(`server.${type}_TOKEN_SECRET`),
            {expiresIn: config.get(`server.${type}_TOKEN_LIFETIME`)}
        );
    }

    validateToken(token, type) {
        try {
            return jwt.verify(token, config.get(`server.${type}_TOKEN_SECRET`));
        }
        catch(e) {
            return null;
        }
    }

    async saveRefreshToken(userId, token) { //TODO: Refactor using IP instead of userId
        const existentTokenData = await this.find({user: userId});

        if (existentTokenData) {
            existentTokenData.refreshToken = token;

            return existentTokenData.save();
        }

        await this.create({refreshToken: token, user: userId});
    }
}

export default new TokenService(Token);