import { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import authMiddleware from '../../middlewares/auth.middleware';
import AuthValidate from '../../validations/auth';

const authRouter = Router();

authRouter.post(
  '/signup',
  AuthValidate.signup,
  AuthController.signUp,
);
authRouter.post('/login', AuthValidate.login, AuthController.logIn);
authRouter.post('/logout', authMiddleware, AuthController.logOut);

authRouter.post(
  '/forget-password',
  AuthValidate.forgetPassword,
  AuthController.forgettingPassword,
);

authRouter.put(
  '/reset-password',
  AuthValidate.resetPassword,
  AuthController.resetingPassword,
);

authRouter.post(
  '/verify',
  AuthValidate.verify,
  AuthController.confirmAccount,
);

export default authRouter;
