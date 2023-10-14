import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import WinnersController from '../../controllers/WinnersController';

const winnersRouter = Router();

winnersRouter.get('/biggest', WinnersController.biggest);

winnersRouter.get('/latest', WinnersController.latest);

export default winnersRouter;
