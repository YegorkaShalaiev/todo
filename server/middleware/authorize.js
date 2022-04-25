import AuthController from "server/controllers/AuthController";
import User from 'server/models/User';

const authController = new AuthController(User);

export default async (req, res, next) => {
    await authController.authorize(req, res, next);
}