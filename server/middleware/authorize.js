import tokenService from 'server/services/TokenService';
import ApiError from "server/errors/ApiError";

export default async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1];
        const userData = tokenService.validateToken(accessToken, 'ACCESS');

        if (userData) {
            req.user = userData;

            return next();
        }
    }

    return next(ApiError.AuthorizationError());
}