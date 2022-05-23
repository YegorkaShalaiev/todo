import BaseError from 'server/errors/BaseError';

export default class ValidationError extends BaseError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.message = message;
        this.status = 400;
    }
}