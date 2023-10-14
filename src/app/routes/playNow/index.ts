import { Router } from 'express';
import PlaynowController from '../../controllers/PlayNowController';
import authMiddleware from '../../middlewares/auth.middleware';

const playNowRouter = Router();

playNowRouter.get('/:betId', authMiddleware, PlaynowController.play);
playNowRouter.get(
  '/start/:gameId',
  authMiddleware,
  PlaynowController.startGame,
);

export default playNowRouter;
