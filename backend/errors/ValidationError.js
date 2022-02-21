import BaseError from 'backend/errors/BaseError';

export default class ValidationError extends BaseError {
    constructor(errors) {
        super();
        this.name = 'ValidationError';
        this.message = errors;
        this.status = 400;
    }
}