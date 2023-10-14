import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class MTNValidate {
  static async requestPay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      amount: joi.number().required(),
      currency: joi.string().default('RWF'),
      partyId: joi.string(),
      payerMessage: joi
        .string()
        .default('You are going to pay ordered products from Zeddi'),
      payeeNote: joi.string().default('Paying now'),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async transactionStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      referenceId: joi.string().uuid().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }
}
