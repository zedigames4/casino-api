import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { BET_STATUS } from '../utils/constants';

export default class BetsValidate {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      game: joi.string().required().label('gameId'),
      iWin: joi.number().positive().required().allow(0),
      iToBet: joi.number().positive().required().allow(0),
      playerData: joi.object(),
      status: joi
        .string()
        .valid(...BET_STATUS)
        .required(),
      currency: joi.string().valid('RWF', 'COIN').required(),
      startTime: joi.date(),
      endingTime: joi.date(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      game: joi.string().label('gameId'),
      iWin: joi.number().positive().allow(0),
      iToBet: joi.number().positive().allow(0),
      playerData: joi.object(),
      status: joi.string().valid(...BET_STATUS),
      currency: joi.string().valid('RWF', 'COIN').required(),
      startTime: joi.date(),
      endingTime: joi.date(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async loose(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      playerData: joi.object().required(),
      expenses: joi.number().required(),
      income: joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async win(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object().keys({
      playerData: joi.object().required(),
      expenses: joi.number().required(),
      income: joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }
}
