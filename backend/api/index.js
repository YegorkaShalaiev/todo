import express from "express";
import bodyParser from 'body-parser';

import auth from './auth';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.use('/auth', auth);

export default router;
