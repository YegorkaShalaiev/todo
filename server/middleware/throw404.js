import { NotFoundError } from "server/errors";

export default (req, res, next) => {
    return next(new NotFoundError);
}
