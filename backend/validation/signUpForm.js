import { check, validationResult } from 'express-validator';
import User from 'backend/models/User';

export default [
    check('email')
        .trim()
        .normalizeEmail()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .custom(async value => {
            const user = await User.findOne({email: value});

            if (user) {
                throw new Error('user already exists')
            }
        })
        .bail(),
    check('password')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 6})
        .bail(),
    check('passwordConfirmation')
        .trim()
        .notEmpty()
        .bail()
        .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    }
];