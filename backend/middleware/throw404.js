import { NotFoundError } from "backend/errors";

export default (req, res, next) => {
    return next(new NotFoundError);
}
