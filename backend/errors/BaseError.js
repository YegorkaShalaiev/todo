export default class BaseError extends Error {
    constructor() {
        super();
        this.status = 500;
        this.name = 'BaseError';
        this.message =  'Internal server error';
    }
}