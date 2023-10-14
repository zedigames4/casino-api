import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class WithdrawrequestValidate {
  static async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      page: joi.number(),
      limit: joi.number(),
      status: joi.string().valid('APPROVED', 'PENDING', 'REJECTED'),
      userId: joi.string(),
    });
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      receiverPhoneNumber: joi.string().required(),
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

  static async decide(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      decision: joi.string().allow('APPROVED', 'REJECTED').required(),
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
