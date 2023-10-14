import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import SettingController from '../../controllers/SettingController';
import SettingValidate from '../../validations/setting';

const settingRouter = Router();

settingRouter.post(
  '/',
  authMiddleware,
  SettingValidate.create,
  SettingController.create,
);
settingRouter.put(
  '/:id',
  authMiddleware,
  SettingValidate.update,
  SettingController.updateItem,
);
settingRouter.get('/', authMiddleware, SettingController.getAll);
settingRouter.get('/:id', authMiddleware, SettingController.getOne);
settingRouter.delete(
  '/:id',
  authMiddleware,
  SettingController.delete,
);

export default settingRouter;
