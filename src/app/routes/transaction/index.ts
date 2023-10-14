import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import TransactionController from '../../controllers/TransactionController';
import TransactionValidate from '../../validations/transaction';

const transactionRouter = Router();

transactionRouter.get(
  '/',
  authMiddleware,
  TransactionValidate.getAll,
  TransactionController.getAll,
);
transactionRouter.post(
  '/',
  authMiddleware,
  TransactionValidate.create,
  TransactionController.create,
);
transactionRouter.get(
  '/:id',
  authMiddleware,
  TransactionController.getOne,
);
transactionRouter.put(
  '/:id',
  authMiddleware,
  TransactionValidate.create,
  TransactionController.updateItem,
);
transactionRouter.delete(
  '/:id',
  authMiddleware,
  TransactionController.delete,
);

export default transactionRouter;
