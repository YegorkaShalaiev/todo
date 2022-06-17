import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authorize from "server/middleware/authorize";
import throw404 from "server/middleware/throw404";
import errorHandler from "server/middleware/errorHandler";

import authenticate from 'server/router/auth';
import dashboard from "server/router/dashboard";

const router = express.Router();

router.use(cookieParser());
router.use(bodyParser.json());

router.use('/auth', authenticate);

router.use('/dashboard', [authorize, dashboard]);

router.use(throw404);

router.use(errorHandler);

export default router;
