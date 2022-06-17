import * as ErrorCodes from 'server/errors/codes';

class ApiError extends Error {
    constructor(status, name, message) {
        super(message);
        this.status = status;
        this.name = name;
    }

    static AuthorizationError() {
        return new ApiError(401, 'AuthorizationError', ErrorCodes.NOT_AUTHORIZED);
    }

    static NotFoundError() {
        return new ApiError(404, 'NotFoundError', ErrorCodes.NOT_FOUND);
    }

    static ValidationError(message) {
        return new ApiError(400, 'ValidationError', message);
    }
}

export default ApiError;