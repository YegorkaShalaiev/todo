import config from 'config';

import userService from 'server/services/UserService';

const REFRESH_TOKEN_COOKIE_NAME = config.get(`server.REFRESH_TOKEN_COOKIE_NAME`);
const REFRESH_TOKEN_LIFETIME = config.get(`server.REFRESH_TOKEN_LIFETIME`);

class UserController {
    async signUp(req, res, next) {
        const { email, password } = req.body;

        try {
            const { accessToken, refreshToken } = await userService.signUp(email, password, next);

            //TODO: Add "secure: true" for https
            res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {httpOnly: true, maxAge: REFRESH_TOKEN_LIFETIME});
            res.status(201).send({accessToken});
        }
        catch(e) {
            return next(e);
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const { accessToken, refreshToken } = await userService.login(email, password);

            //TODO: Add "secure: true" for https
            res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {httpOnly: true, maxAge: REFRESH_TOKEN_LIFETIME});
            res.status(200).send({accessToken});
        }
        catch(e) {
            return next(e);
        }
    }

    async logout(req, res, next) {
        const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

        try {
            await userService.logout(refreshToken);
        }
        catch(e) {
            return next(e);
        }

        res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
        res.status(200).send();
    }

    async refresh(req, res, next) {
        const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

        try {
            const { accessToken, refreshToken: newRefreshToken } = await userService.refresh(refreshToken);
            //TODO: Add "secure: true" for https
            res.cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, {httpOnly: true, maxAge: REFRESH_TOKEN_LIFETIME});
            res.status(200).send({accessToken});
        }
        catch(e) {
            return next(e);
        }
    }
}

export default new UserController();