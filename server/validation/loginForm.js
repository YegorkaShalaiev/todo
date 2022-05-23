import { check } from 'express-validator';
import User from "../models/User";
import handleValidationErrors from "server/middleware/handleValidationErrors";
import * as ErrorCodes from "server/errors/codes";
import ValidationError from "server/errors/ValidationError";

export default [
    check('email', ErrorCodes.INVALID_VALUE)
        .trim()
        .normalizeEmail()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .custom(async value => {
            const user = await User.findOne({email: value});

            if (!user) {
                throw new ValidationError(ErrorCodes.USER_DOES_NOT_EXIST);
            }
        }),
    check('password', ErrorCodes.INVALID_VALUE)
        .trim()
        .notEmpty(),
    (req, res, next) => handleValidationErrors(req, res, next)
];