import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Keys from '../keys';
import Bet from '../models/Bet';
import Game from '../models/Game';
import convertToSlug from '../utils/slug';

export default class PlaynowController {
  static play = async (req: RequestWithUser, res: Response) => {
    try {
      const { betId: id } = req.params;

      const findOne = await Bet.findOne({
        _id: id,
        user: req.user._id,
      }).populate('game');
      if (!findOne)
        throw new HttpException(409, 'Bet before playing');

      const game = findOne.game as any;

      const url = `${Keys.HOST}/play/${convertToSlug(
        game.title,
      )}?user=${findOne.user}&game=${game._id}&bet=${
        findOne._id
      }&token=${req.user.token}`;
      res.redirect(url);
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static startGame = async (req: RequestWithUser, res: Response) => {
    try {
      const { gameId: id } = req.params;

      const findOne = await Game.findById(id);
      if (!findOne) throw new HttpException(409, 'Game is not found');

      const url = `${Keys.HOST}/play/${convertToSlug(
        findOne.title,
      )}?user=${req.user._id}&game=${findOne._id}&token=${
        req.user.token
      }`;
      res.redirect(url);
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
