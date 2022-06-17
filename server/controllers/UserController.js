import config from 'config';

import userService from 'server/services/UserService';

class UserController {
    async signUp(req, res, next) {
        const { email, password } = req.body;

        try {
            const { accessToken, refreshToken } = await userService.signUp(email, password, next);

            res.cookie(
                config.get(`server.REFRESH_TOKEN_COOKIE_NAME`),
                refreshToken,
                {httpOnly: true, maxAge: config.get(`server.REFRESH_TOKEN_LIFETIME`)}
            );
            //TODO: Add "secure: true" for https
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

            res.cookie(
                config.get(`server.REFRESH_TOKEN_COOKIE_NAME`),
                refreshToken,
                {httpOnly: true, maxAge: config.get(`server.REFRESH_TOKEN_LIFETIME`)}
            );
            //TODO: Add "secure: true" for https
            res.status(200).send({accessToken});
        }
        catch(e) {
            return next(e);
        }
    }

    async logout(req, res, next) {
        const refreshToken = req.cookies[config.get(`server.REFRESH_TOKEN_COOKIE_NAME`)];

        try {
            await userService.logout(refreshToken);
        }
        catch(e) {
            return next(e);
        }

        res.clearCookie(config.get(`server.REFRESH_TOKEN_COOKIE_NAME`));
        res.status(200).send();
    }

    async refresh(req, res, next) {
        const refreshToken = req.cookies[config.get(`server.REFRESH_TOKEN_COOKIE_NAME`)];

        try {
            const { accessToken, refreshToken: newRefreshToken } = await userService.refresh(refreshToken);

            res.cookie(
                config.get(`server.REFRESH_TOKEN_COOKIE_NAME`),
                newRefreshToken,
                {httpOnly: true, maxAge: config.get(`server.REFRESH_TOKEN_LIFETIME`)}
            );
            //TODO: Add "secure: true" for https
            res.status(200).send({accessToken});
        }
        catch(e) {
            return next(e);
        }
    }
}

export default new UserController();