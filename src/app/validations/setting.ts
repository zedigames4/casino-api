import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class SettingValidate {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      coinToRwf: joi.number().default(1),
      isGlobal: joi.boolean().default(false),
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
      coinToRwf: joi.number().default(1),
      isGlobal: joi.boolean().default(false),
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
