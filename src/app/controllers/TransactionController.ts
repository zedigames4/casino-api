import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import Transaction from '../models/Transaction';
import { isRoleAllowed } from '../utils/helper';
import { paginate } from '../utils/pagination';

export default class TransactionController {
  static getAll = async (req: any, res: Response) => {
    try {
      const { action, status, receiver, mode } = req.query;
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const where: Record<string, any> = {};

      if (action) {
        where.action = action;
      }
      if (status) {
        where.status = status;
      }

      if (receiver) {
        where.receiver = receiver;
      }

      if (mode) {
        where.mode = mode;
      }

      if (!isRoleAllowed(req.user.role)) {
        where.user = req.user._id;
      }

      const allData = await Transaction.find(where)
        .sort({ createdAt: -1 })
        .populate('user', 'firstName lastName email')
        .skip(offset)
        .limit(limit);
      const count = await Transaction.count(where);

      const pagination = paginate(count, limit, page);

      res
        .status(200)
        .json({ data: allData, pagination, message: 'findAll' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static getOne = async (req: any, res: Response) => {
    try {
      const { id } = req.params;

      const findOne = await Transaction.findOne({
        _id: id,
        user: req.user._id,
      }).populate('user', '-_id firstName lastName email');
      if (!findOne)
        throw new HttpException(409, "Transaction doesn't exist");

      res.status(200).json({ data: findOne, message: 'findOne' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static create = async (req: any, res: Response) => {
    try {
      const itemData: any = req.body;
      const createItemData = new Transaction({
        ...itemData,
        user: req.user._id,
      });

      const newData = await createItemData.save();

      res.status(201).json({ data: newData, message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static updateItem = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const itemData: any = req.body;
      const findOne = await Transaction.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne)
        throw new HttpException(409, "Transaction doesn't exist");
      await Transaction.updateOne(
        { _id: id, user: req.user._id },
        { ...itemData, user: req.user._id },
      );

      const updateItem = await Transaction.findById({
        _id: id,
      });

      res.status(200).json({ data: updateItem, message: 'updated' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static delete = async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const findOne = await Transaction.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne)
        throw new HttpException(409, "Transaction doesn't exist");

      await Transaction.deleteOne({ _id: id });
      res.status(200).json({ data: findOne, message: 'deleted' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
