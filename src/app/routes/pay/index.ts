import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import MTNController from '../../controllers/MTNController';
import MTNValidate from '../../validations/mtn';

import OltranzController from '../../controllers/OltranzController';
import OltranzValidate from '../../validations/oltranz';

const paymentRouter = Router();

paymentRouter.post(
  '/mtn',
  authMiddleware,
  MTNValidate.requestPay,
  MTNController.requestPay,
);
paymentRouter.get(
  '/mtn/:referenceId',
  authMiddleware,
  MTNValidate.transactionStatus,
  MTNController.transactionStatus,
);

// oltranz
paymentRouter.post(
  '/oltranz',
  authMiddleware,
  OltranzValidate.requestPay,
  OltranzController.requestPay,
);
paymentRouter.post(
  '/oltranz/transfer',
  authMiddleware,
  OltranzValidate.transfer,
  OltranzController.transfer,
);

paymentRouter.post(
  '/oltranz/callback/paymentrequest',
  OltranzController.handleRequestToPayCallback,
);

paymentRouter.post(
  '/oltranz/callback/fundstransfer',
  OltranzController.handleTransferCallback,
);

export default paymentRouter;
