import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import Subscriber from '../models/Subscriber';
import { paginate } from '../utils/pagination';

export default class SubscriberController {
  static getAll = async (req: any, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const allData = await Subscriber.find()
        .skip(offset)
        .limit(limit);
      const count = await Subscriber.count();

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

      const findOne = await Subscriber.findById(id);
      if (!findOne)
        throw new HttpException(409, "Subscriber doesn't exist");

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

      const foundItem = await Subscriber.findOne({
        email: itemData.email,
      });

      if (foundItem) {
        throw new HttpException(409, 'Email is already subscribed');
      }
      const createItemData = new Subscriber(itemData);

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
      const findOne = await Subscriber.findById(id);
      if (!findOne)
        throw new HttpException(409, "Subscriber doesn't exist");
      await Subscriber.updateOne({ _id: id }, itemData);

      const updateItem = await Subscriber.findById(id);

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
      const findOne = await Subscriber.findById(id);
      if (!findOne)
        throw new HttpException(409, "Subscriber doesn't exist");

      await Subscriber.deleteOne({ _id: id });
      res.status(200).json({ data: findOne, message: 'deleted' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
