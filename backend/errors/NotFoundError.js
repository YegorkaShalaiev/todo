import BaseError from "./BaseError";

export default class NotFoundError extends BaseError {
    constructor() {
        super();
        this.status = 404;
        this.name = 'NotFoundError';
        this.message = 'Not found';
    }
}