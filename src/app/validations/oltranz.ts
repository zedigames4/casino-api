import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class OltranzValidate {
  static async requestPay(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      amount: joi.number().required(),
      telephoneNumber: joi.string(),
      description: joi
        .string()
        .default('You are going to pay ordered products from Zeddi'),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async transfer(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      amount: joi.number().required(),
      receiverAccount: joi.string(),
      type: joi.string().valid('BANK', 'MOBILE').required(),
      bankName: joi.string(),
      description: joi.string().default('FUNDS TRANSFER'),
      firstName: joi.string(),
      lastName: joi.string(),
      receiver: joi.string().required(),
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

  static async transferTransactionStatus(
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
