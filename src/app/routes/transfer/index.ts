import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import TransferController from '../../controllers/TransferController';
import TransferValidate from '../../validations/transfer';

const transferRouter = Router();

transferRouter.get(
  '/',
  authMiddleware,
  TransferValidate.getAll,
  TransferController.getAll,
);
transferRouter.post(
  '/',
  authMiddleware,
  TransferValidate.create,
  TransferController.create,
);
transferRouter.get('/:id', authMiddleware, TransferController.getOne);

export default transferRouter;
