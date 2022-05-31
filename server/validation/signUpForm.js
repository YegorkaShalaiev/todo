import { check } from 'express-validator';
import User from 'server/models/User';
import handleValidationErrors from "server/middleware/handleValidationErrors";
import * as ErrorCodes from 'server/errors/codes';
import ValidationError from "server/errors/ValidationError";

export default [
    check('email', ErrorCodes.INVALID_VALUE)
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .custom(async value => {
            const user = await User.findOne({email: value});

            if (user) {
                throw new ValidationError(ErrorCodes.USER_ALREADY_EXISTS);
            }
        })
        .bail(),
    check('password', ErrorCodes.INVALID_VALUE)
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 6})
        .bail(),
    check('passwordConfirmation', ErrorCodes.INVALID_VALUE)
        .trim()
        .notEmpty()
        .bail()
        .custom((value, { req }) => value === req.body.password),
    (req, res, next) => handleValidationErrors(req, res, next)
];