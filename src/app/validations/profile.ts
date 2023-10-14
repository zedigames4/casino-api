import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class ProfileValidate {
  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      firstName: joi.string(),
      lastName: joi.string(),
      phoneNumber: joi.string(),
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
