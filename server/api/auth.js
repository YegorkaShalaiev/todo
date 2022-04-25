import express from "express";
import AuthController from "server/controllers/AuthController";
import User from 'server/models/User';
import validate from 'server/validation';

const router = express.Router();

const authController = new AuthController(User);

router.post('/sign-up', validate.signUpForm, async (...args) => await authController.signUp(...args));
router.post('/login', validate.loginForm, async (...args) => await authController.login(...args));

export default router;