import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class ContactValidate {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      name: joi.string().required(),
      message: joi.string().required(),
      email: joi.string().email().required(),
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
