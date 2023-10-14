import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Keys from '../keys';
import Game from '../models/Game';
import removeFile from '../utils/file';
import { imageUrl } from '../utils/helper';
import { paginate } from '../utils/pagination';
import convertToSlug from '../utils/slug';

export default class GameController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const allData = await Game.find().skip(offset).limit(limit);
      const count = await Game.count();

      const pagination = paginate(count, limit, page);

      const results = allData.map(item => {
        // eslint-disable-next-line no-param-reassign
        item.images = item.images.map(element => imageUrl(element));
        // eslint-disable-next-line no-param-reassign
        item.url = `${Keys.HOST}/play/${item._id}/${convertToSlug(
          item.title,
        )}`;
        return item.toJSON();
      });

      res
        .status(200)
        .json({ data: results, pagination, message: 'findAll' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const findOne = await Game.findById(id);
      if (!findOne)
        throw new HttpException(409, "Game doesn't exist");

      findOne.images = findOne.images.map(item => imageUrl(item));
      findOne.url = `${Keys.HOST}/play/${findOne._id}/${convertToSlug(
        findOne.title,
      )}z`;

      res
        .status(200)
        .json({ data: findOne.toJSON(), message: 'findOne' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static create = async (req: RequestWithUser, res: Response) => {
    try {
      const itemData: any = req.body;
      if (!req.files?.length) {
        throw new HttpException(400, 'Game images are required');
      }
      itemData.images = req.files.map(item => item.filename);
      const createItemData = new Game(itemData);

      const newData = await createItemData.save();
      newData.images = newData.images.map(item => imageUrl(item));
      newData.url = `${Keys.HOST}/play/${newData._id}/${convertToSlug(
        newData.title,
      )}`;

      res
        .status(201)
        .json({ data: newData.toJSON(), message: 'created' });
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
      const findOne = await Game.findById({ _id: id });
      if (!findOne)
        throw new HttpException(409, "Game doesn't exist");

      if (req.files?.length) {
        itemData.images = req.files.map(item => item.filename);
        removeFile(findOne.images);
      }
      await Game.updateOne({ _id: id }, itemData);

      const updateItem = await Game.findById({
        _id: id,
      });

      updateItem.images = updateItem.images.map(item =>
        imageUrl(item),
      );
      updateItem.url = `${Keys.HOST}/play/${
        updateItem._id
      }/${convertToSlug(updateItem.title)}`;

      res
        .status(200)
        .json({ data: updateItem.toJSON(), message: 'updated' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const findOne = await Game.findById({ _id: id });
      if (!findOne)
        throw new HttpException(409, "Game doesn't exist");

      await Game.deleteOne({ _id: id });
      removeFile(findOne.images);
      findOne.images = findOne.images.map(item => imageUrl(item));
      findOne.url = `${Keys.HOST}/play/${findOne._id}/${convertToSlug(
        findOne.title,
      )}z`;
      res
        .status(200)
        .json({ data: findOne.toJSON(), message: 'deleted' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
