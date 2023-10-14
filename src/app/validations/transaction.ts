import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class TransactionValidate {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      method: joi.object().required(),
      action: joi.string(),
      currency: joi.string(),
      amount: joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      user: joi.string(),
      receiver: joi.string(),
      status: joi.string().valid('SUCCESSFUL', 'PENDING', 'FAILED'),
      mode: joi.string(),
      action: joi.string().allow('deposit', 'transfer', 'withdraw'),
    });
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }
}
