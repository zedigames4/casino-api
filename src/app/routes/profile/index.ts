import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import ProfileController from '../../controllers/ProfileController';
import upload from '../../utils/upload';
import ProfileValidate from '../../validations/profile';
import WalletController from '../../controllers/WalletController';
import WalletValidate from '../../validations/wallet';

const profileRouter = Router();

profileRouter.get('/me', authMiddleware, ProfileController.getOne);
profileRouter.get(
  '/me/wallet',
  authMiddleware,
  WalletController.getMyWallet,
);
// profileRouter.post(
//   '/me/topup',
//   authMiddleware,
//   WalletValidate.topup,
//   WalletController.topup,
// );
profileRouter.post(
  '/me/withdraw',
  authMiddleware,
  WalletValidate.withdraw,
  WalletController.withdraw,
);
profileRouter.put(
  '/me',
  authMiddleware,
  upload.single('avatar'),
  ProfileValidate.update,
  ProfileController.updateItem,
);
profileRouter.delete('/me', authMiddleware, ProfileController.delete);
profileRouter.patch(
  '/me/referral-code',
  authMiddleware,
  ProfileController.updateReferralCode,
);

export default profileRouter;
