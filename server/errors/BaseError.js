export default class BaseError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
        this.name = 'BaseError';
        this.message = message || 'Internal server error';
    }
}