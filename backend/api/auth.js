import express from "express";
import AuthController from "backend/controllers/AuthController";
import User from 'backend/models/User';
import validate from 'backend/validation';

const router = express.Router();

const authController = new AuthController(User);

router.post('/sign-up', validate.signUpForm, async (...args) => await authController.signUp(...args));
router.post('/login', validate.loginForm, async (...args) => await authController.login(...args));

export default router;