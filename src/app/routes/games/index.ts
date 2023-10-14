import { Router } from 'express';
import authMiddleware, { allowedRoles } from '../../middlewares/auth.middleware';
import GameController from '../../controllers/GameController';
import upload from '../../utils/upload';
import GameValidate from '../../validations/games';

const gamesRouter = Router();

gamesRouter.get('/', GameController.getAll);
gamesRouter.post('/',  authMiddleware, allowedRoles, upload.array('images', 4), GameValidate.create, GameController.create);
gamesRouter.get('/:id', GameController.getOne);
gamesRouter.put('/:id', authMiddleware, allowedRoles, upload.array('images', 4), GameController.updateItem);
gamesRouter.delete('/:id', authMiddleware, allowedRoles, GameController.delete);

export default gamesRouter;
