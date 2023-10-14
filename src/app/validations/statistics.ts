import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export default class StatisticsValidate {
  static async incomeExpenses(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const schema = joi.object().keys({
      startDate: joi.date(),
      endDate: joi.date(),
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
