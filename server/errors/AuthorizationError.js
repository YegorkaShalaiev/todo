import BaseError from "./BaseError";
import * as ErrorCodes from 'server/errors/codes';

export default class AuthorizationError extends BaseError {
    constructor(msg) {
        super(msg);
        this.status = 401;
        this.name = 'AuthorizationError';
        this.message = msg || ErrorCodes.NOT_AUTHORIZED;
    }
}