import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import WalletController from '../../controllers/WalletController';
import WalletValidate from '../../validations/wallet';

const walletRouter = Router();

walletRouter.post('/', authMiddleware, WalletController.create);
walletRouter.get('/', authMiddleware, WalletController.getAll);
walletRouter.get('/:id', authMiddleware, WalletController.getOne);
walletRouter.post(
  '/:id/main-wallet',
  authMiddleware,
  WalletController.setMainWallet,
);
walletRouter.post(
  '/:id/minimum-balance',
  authMiddleware,
  WalletValidate.setMinimumBalance,
  WalletController.setMinimuBalance,
);

export default walletRouter;
