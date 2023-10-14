import { Router } from 'express';
import authMiddleware, {
  allowedRoles,
} from '../../middlewares/auth.middleware';
import WithdrawRequestController from '../../controllers/WithdrawRequestController';
import WithdrawrequestValidate from '../../validations/withdrawrequest';
import OltranzController from '../../controllers/OltranzController';

const withdrawrequestsRouter = Router();

withdrawrequestsRouter.get(
  '/',
  authMiddleware,
  WithdrawrequestValidate.findAll,
  WithdrawRequestController.getAll,
);
withdrawrequestsRouter.post(
  '/',
  authMiddleware,
  WithdrawrequestValidate.create,
  WithdrawRequestController.create,
);
withdrawrequestsRouter.get(
  '/:id',
  authMiddleware,
  WithdrawRequestController.getOne,
);
withdrawrequestsRouter.post(
  '/:id/decide',
  authMiddleware,
  allowedRoles,
  WithdrawrequestValidate.decide,
  WithdrawRequestController.decide,
  OltranzController.transfer,
);

export default withdrawrequestsRouter;
