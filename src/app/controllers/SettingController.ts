import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Setting from '../models/Setting';
import { paginate } from '../utils/pagination';

export default class SettingController {
  static getAll = async (req: RequestWithUser, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const allData = await Setting.find({ user: req.user._id })
        .skip(offset)
        .limit(limit);
      const count = await Setting.count({ user: req.user._id });

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

  static getOne = async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;

      const findOne = await Setting.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne)
        throw new HttpException(409, "Setting doesn't exist");

      res.status(200).json({ data: findOne, message: 'findOne' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static create = async (req: RequestWithUser, res: Response) => {
    try {
      const itemData: any = req.body;
      if (req.user.role !== 'admin') {
        itemData.isGlobal = false;
      }
      const createItemData = new Setting({
        ...itemData,
        user: req.user._id,
      });
      let results: any = null;
      if (itemData.isGlobal) {
        const previousItem = await Setting.findOne({
          isGlobal: true,
        });
        if (previousItem) {
          previousItem.set(itemData);
          results = previousItem.save();
        } else {
          results = await createItemData.save();
        }
      } else {
        results = await createItemData.save();
      }

      res.status(201).json({ data: results, message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static updateItem = async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;
      const itemData: any = req.body;
      if (req.user.role !== 'admin') {
        itemData.isGlobal = false;
      }
      const findOne = await Setting.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne)
        throw new HttpException(409, "Setting doesn't exist");
      await Setting.updateOne(
        { _id: id, user: req.user._id },
        { ...itemData, user: req.user._id },
      );

      const updateItem = await Setting.findById({
        _id: id,
      });

      res.status(200).json({ data: updateItem, message: 'updated' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static delete = async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;
      const findOne = await Setting.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne)
        throw new HttpException(409, "Setting doesn't exist");

      await Setting.deleteOne({ _id: id });
      res.status(200).json({ data: findOne, message: 'deleted' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
