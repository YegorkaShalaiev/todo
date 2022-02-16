import express from "express";
import todo from './todo';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.use('/todo', todo);

export default router;
