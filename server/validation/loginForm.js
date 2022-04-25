import { check, validationResult } from 'express-validator';

export default [
    check('email')
        .trim()
        .normalizeEmail()
        .notEmpty()
        .bail()
        .isEmail()
        .bail(),
    check('password')
        .trim()
        .notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        next();
    }
];