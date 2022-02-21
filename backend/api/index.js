import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authorize from "backend/middleware/authorize";
import throw404 from "backend/middleware/throw404";
import errorHandler from "backend/middleware/errorHandler";

import authenticate from 'backend/api/auth';

const router = express.Router();

router.use(cookieParser());
router.use(bodyParser.urlencoded({extended: false}));

router.use('/auth', authenticate);
router.use(authorize);

router.use(throw404);
router.use(errorHandler);

export default router;
