import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

import Controller from './Controller';

import { AuthorizationError } from 'backend/errors';

class AuthController extends Controller {
    constructor(model) {
        super(model);
    }

    async signUp(req, res, next) {
        const { email, password } = req.body;
        const user = await this.get({email});

        if (user) {
            return next(new AuthorizationError);
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        await this.create({email, password: passwordHash});

        return this.login(req, res, next);
    }

    async login(req, res, next) {
        const user = await this.get({email: req.body.email});

        if (!user) {
            return next(new AuthorizationError);
        }

        const passwordMatch = await bcryptjs.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return next(new AuthorizationError);
        }

        const accessToken = await this.generateToken(user.id);
        const refreshToken = await this.generateToken(user.id, {type: 'refresh'});

        await this.update({refreshToken});

        //TODO: Add "secure: true" for https
        res.cookie(config.get(`server.ACCESS_TOKEN_COOKIE_NAME`), accessToken, {httpOnly: true});
        res.status(201).send();
    }

    async authorize(req, res, next) {
        const accessToken = req.cookies[config.get(`server.ACCESS_TOKEN_COOKIE_NAME`)];

        await jwt.verify(accessToken, config.get(`server.ACCESS_TOKEN_SECRET`), err => {
            if (!err) {
                return next();
            }

            if (err.name === 'TokenExpiredError') {
                return this.refreshAccessToken(req, res, next, accessToken);
            }

            return next(new AuthorizationError);
        });
    }

    async generateToken(userId, options = {type: 'access'}) {
        const type = options.type.toUpperCase();
        const secret = config.get(`server.${type}_TOKEN_SECRET`);
        const expiresIn = config.get(`server.${type}_TOKEN_LIFETIME`);

        return jwt.sign({userId}, secret, {expiresIn});
    }

    async refreshAccessToken(req, res, next, accessToken) {
        const payload = await jwt.decode(accessToken, config.get(`server.ACCESS_TOKEN_SECRET`));
        const user = await this.get({id: payload.userId});

        await jwt.verify(user && user.refreshToken, config.get(`server.REFRESH_TOKEN_SECRET`), err => err && next(new AuthorizationError));

        const newAccessToken = await this.generateToken(user.id);

        //TODO: Add "secure: true" for https
        res.cookie(config.get(`server.ACCESS_TOKEN_COOKIE_NAME`), newAccessToken, {httpOnly: true});

        next();
    }
}

export default AuthController;