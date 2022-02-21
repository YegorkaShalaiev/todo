import AuthController from "backend/controllers/AuthController";
import User from 'backend/models/User';

const authController = new AuthController(User);

export default async (req, res, next) => {
    await authController.authorize(req, res, next);
}