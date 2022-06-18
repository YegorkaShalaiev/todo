import { check } from 'express-validator';
import User from "server/models/User";
import handleValidationErrors from "server/middleware/handleValidationErrors";
import * as ErrorCodes from "server/errors/codes";
import ApiError from "server/errors/ApiError";

export default [
    check('email', ErrorCodes.INVALID_VALUE)
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .custom(async value => {
            const user = await User.findOne({email: value});

            if (!user) {
                throw ApiError.ValidationError(ErrorCodes.USER_DOES_NOT_EXIST);
            }
        }),
    check('password', ErrorCodes.INVALID_VALUE)
        .trim()
        .notEmpty(),
    (req, res, next) => handleValidationErrors(req, res, next)
];