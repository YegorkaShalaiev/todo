import { validationResult } from "express-validator";

export default (req, res, next) => {
    const result = validationResult(req).array({onlyFirstError: true});

    if (result.length) {
        const errors = result.reduce((acc, item) => ({...acc, [item.param]: item.msg}) ,{});

        return res.status(400).json({errors});
    }

    next();
}