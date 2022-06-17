import express from "express";
import userController from "server/controllers/UserController";

import validate from 'server/validation';

const router = express.Router();

router.post('/sign-up', validate.signUpForm, userController.signUp);
router.post('/login', validate.loginForm, userController.login);
router.post('/logout',  userController.logout);
router.get('/refresh',  userController.refresh);

export default router;