import { Router } from 'express';
import authMiddleware, {
  allowedRoles,
} from '../../middlewares/auth.middleware';
import ContactController from '../../controllers/ContactController';
import ContactValidate from '../../validations/contact';

const contactRouter = Router();

contactRouter.get(
  '/',
  authMiddleware,
  allowedRoles,
  ContactController.getAll,
);
contactRouter.post(
  '/',
  ContactValidate.create,
  ContactController.create,
);
contactRouter.get(
  '/:id',
  authMiddleware,
  allowedRoles,
  ContactController.getOne,
);
contactRouter.put(
  '/:id',
  authMiddleware,
  allowedRoles,
  ContactValidate.create,
  ContactController.updateItem,
);
contactRouter.delete(
  '/:id',
  authMiddleware,
  allowedRoles,
  ContactController.delete,
);

export default contactRouter;
