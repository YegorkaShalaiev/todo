import BaseError from "./BaseError";

export default class AuthorizationError extends BaseError {
    constructor() {
        super();
        this.status = 401;
        this.name = 'AuthorizationError';
        this.message = 'Not authorized';
    }
}