import { NextFunction, Response, Request } from 'express';
import Game from '../models/Game';

export const playGameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      res.redirect('/404');
    } else {
      next();
    }
  } catch (error) {
    res.redirect('/400');
  }
};
