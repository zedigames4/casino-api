import { Router } from 'express';
import UserController from '../../controllers/UserController';
import authMiddleware, {
  allowedRoles,
} from '../../middlewares/auth.middleware';
import AuthValidate from '../../validations/auth';

const userRouter = Router();
userRouter.get(
  '/',
  authMiddleware,
  allowedRoles,
  UserController.getUsers,
);
userRouter.get(
  '/:id',
  authMiddleware,
  allowedRoles,
  UserController.getUserById,
);
userRouter.get(
  '/:userId/referrals',
  authMiddleware,
  UserController.getReferrals,
);
userRouter.post(
  '/',
  authMiddleware,
  allowedRoles,
  AuthValidate.signup,
  UserController.createUser,
);
userRouter.put(
  '/:id',
  authMiddleware,
  allowedRoles,
  AuthValidate.update,
  UserController.updateUser,
);
userRouter.delete(
  '/:id',
  authMiddleware,
  allowedRoles,
  UserController.deleteUser,
);

export default userRouter;
