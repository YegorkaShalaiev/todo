import express from "express";
import todo from './todo';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded());

router.use('/todo', todo);

export default router;
