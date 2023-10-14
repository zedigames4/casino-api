import { Router } from 'express';
import authMiddleware, {
  allowedRoles,
} from '../../middlewares/auth.middleware';
import SubscriberController from '../../controllers/SubscriberController';
import SubscribeValidate from '../../validations/subscriber';

const subscriberRouter = Router();

subscriberRouter.get(
  '/',
  authMiddleware,
  allowedRoles,
  SubscriberController.getAll,
);
subscriberRouter.post(
  '/',
  SubscribeValidate.create,
  SubscriberController.create,
);
subscriberRouter.get(
  '/:id',
  authMiddleware,
  allowedRoles,
  SubscriberController.getOne,
);
subscriberRouter.put(
  '/:id',
  authMiddleware,
  allowedRoles,
  SubscribeValidate.create,
  SubscriberController.updateItem,
);
subscriberRouter.delete(
  '/:id',
  authMiddleware,
  allowedRoles,
  SubscriberController.delete,
);

export default subscriberRouter;
