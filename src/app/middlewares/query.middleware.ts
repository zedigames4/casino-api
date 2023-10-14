import { NextFunction, Response } from 'express';

export const settingsMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const offset = (page - 1) * limit;

  req.pagination = {
    page,
    limit,
    offset,
  };

  next();
};
