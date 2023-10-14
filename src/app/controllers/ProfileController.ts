import { Response, Request } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import User from '../models/User';
import removeFile from '../utils/file';
import { imageUrl } from '../utils/helper';
import AuthController from './AuthController';

export default class UserController {
  static getOne = async (req: RequestWithUser, res: Response) => {
    try {
      const findOne = await User.findById(req.user._id);
      if (!findOne)
        throw new HttpException(409, "User doesn't exist");

      findOne.avatar = imageUrl(findOne.avatar);

      res
        .status(200)
        .json({ data: findOne.toJSON(), message: 'findOne' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static updateReferralCode = async (
    req: RequestWithUser,
    res: Response,
  ) => {
    try {
      const findOne = await User.findById(req.user._id);
      if (!findOne)
        throw new HttpException(409, "User doesn't exist");

      const referralCode = AuthController.generateReferralCode();

      findOne.set({
        referralCode,
      });
      await findOne.save();

      res.status(200).json({ referralCode, message: 'updated' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static updateItem = async (req: RequestWithUser, res: Response) => {
    try {
      const itemData: any = req.body;
      const findOne = await User.findById(req.user._id);
      if (!findOne)
        throw new HttpException(409, "User doesn't exist");

      if (req.file) {
        itemData.avatar = req.file.filename;
        removeFile(findOne.avatar);
      }
      findOne.set(itemData);

      const updateItem = await findOne.save();
      updateItem.avatar = imageUrl(updateItem.avatar);

      res
        .status(200)
        .json({ data: updateItem.toJSON(), message: 'updated' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static delete = async (req: RequestWithUser, res: Response) => {
    try {
      const findOne = await User.findById(req.user._id);
      if (!findOne)
        throw new HttpException(409, "User doesn't exist");

      await findOne.deleteOne();

      findOne.avatar = imageUrl(findOne.avatar);

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
