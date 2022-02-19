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
        const passwordHash = await bcryptjs.hash(password, 10);

        await this.create(req, res, {email, password: passwordHash});

        return this.login(req, res, next);
    }

    async login(req, res, next) {
        const user = await this.get({email: req.body.email});

        if (!user) {
            return next(new AuthorizationError);
        }

        const token = await this.generateWebToken(req, next, user);

        res.json({token});
    }

    async generateWebToken(req, next, user) {
        const passwordMatch = await bcryptjs.compare(req.body.password, user.password);
        const secret = config.get('server.JWT_SECRET');

        if (!passwordMatch) {
            return next(new AuthorizationError);
        }

        return jwt.sign({userId: user.id}, secret, {expiresIn: '1h'});
    }
}

export default AuthController;