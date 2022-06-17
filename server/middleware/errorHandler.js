import ApiError from 'server/errors/ApiError';
import { UNEXPECTED_ERROR } from "server/errors/codes";

import log from 'server/utils/log';

export default (err, req, res, next) => {
    log.error(err);

    if (err instanceof ApiError) {
        return res.status(err.status).send(err.message);
    }

    return res.status(500).send(UNEXPECTED_ERROR);
}