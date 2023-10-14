import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import BetController from '../../controllers/BetController';
import BetsValidate from '../../validations/bets';

const betRouter = Router();

betRouter.get('/', authMiddleware, BetController.getAll);
betRouter.get('/public/all', BetController.publicGetAll);
betRouter.post(
  '/',
  authMiddleware,
  BetsValidate.create,
  BetController.create,
);
betRouter.get('/:id', authMiddleware, BetController.getOne);
betRouter.put(
  '/:id',
  authMiddleware,
  BetsValidate.update,
  BetController.updateItem,
);
betRouter.delete('/:id', authMiddleware, BetController.delete);

export default betRouter;
