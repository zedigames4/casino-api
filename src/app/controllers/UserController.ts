import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { Types } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';
import User from '../models/User';
import { paginate } from '../utils/pagination';
import { RequestWithUser } from '../interfaces/auth.interface';
import { imageUrl } from '../utils/helper';
import AuthController from './AuthController';

class UsersController {
  static async getReferrals(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const currentUser = await User.findById(req.params.userId);
      if (!currentUser)
        throw new HttpException(409, 'User not found');

      const where = { _id: { $in: currentUser.invitedFriends } };

      const allData = await User.find(where)
        .select(
          'firstName lastName email phoneNumber avatar referralCode createdAt',
        )
        .skip(offset)
        .limit(limit);
      const count = await User.count(where);

      const pagination = paginate(count, limit, page);

      const results = allData.map(item => {
        const user = item.toJSON();
        user.avatar = imageUrl(item.avatar);
        return user;
      });

      res
        .status(200)
        .json({ data: results, pagination, message: 'findAll' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  }

  static getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const { search } = req.query;

      let $match: Record<string, any> = {};

      if (search) {
        $match = {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { phoneNumber: { $regex: search, $options: 'i' } },
            { role: { $regex: search, $options: 'i' } },
          ],
        };
      }

      const allData = await User.aggregate([
        { $match },
        {
          $lookup: {
            from: 'wallets',
            localField: '_id',
            foreignField: 'user',
            as: 'wallet',
          },
        },
        {
          $addFields: {
            balance: {
              $sum: '$wallet.balance',
            },
            income: {
              $sum: '$wallet.income',
            },
            expenses: {
              $sum: '$wallet.expenses',
            },
          },
        },
        {
          $skip: offset,
        },
        {
          $limit: limit,
        },
      ]);
      const count = await User.count($match);
      const pagination = paginate(count, limit, page);

      const results = allData.map(item => {
        const { wallet, ...other } = item;
        other.avatar = imageUrl(other.avatar);
        return other;
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

  static getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = new Types.ObjectId(req.params.id);

      const findUser = await User.aggregate([
        { $match: { _id: userId } },
        {
          $lookup: {
            from: 'wallets',
            localField: '_id',
            foreignField: 'user',
            as: 'wallet',
          },
        },
        {
          $addFields: {
            balance: {
              $sum: '$wallet.balance',
            },
            income: {
              $sum: '$wallet.income',
            },
            expenses: {
              $sum: '$wallet.expenses',
            },
          },
        },
      ]);

      const firstUser = findUser.length > 0 ? findUser[0] : null;

      if (!firstUser)
        throw new HttpException(409, "User doesn't exist");

      firstUser.avatar = imageUrl(firstUser.avatar);

      const { wallet, password, ...other } = firstUser;

      res.status(200).json({ data: other, message: 'findOne' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      const userData: any = req.body;

      const findUser = await User.findOne({
        email: userData.email,
      }).exec();
      if (findUser)
        throw new HttpException(
          409,
          `This email ${userData.email} already exists`,
        );

      const hashedPassword = await hash(userData.password, 10);
      const createUserData = new User({
        ...userData,
        referralCode: AuthController.generateReferralCode(),
        password: hashedPassword,
      });

      const newUser = await createUserData.save();

      newUser.avatar = imageUrl(newUser.avatar);

      res.status(201).json({ data: newUser, message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static updateUser = async (req: RequestWithUser, res: Response) => {
    try {
      const userId = req.params.id;
      const userData: any = req.body;
      const findUser = await User.findById({ _id: userId });
      if (!findUser)
        throw new HttpException(409, "User doesn't exist");

      if (userData.password) {
        userData.password = await hash(userData.password, 10);
      }
      await User.updateOne({ _id: userId }, userData);

      const updateUser = await User.findById({
        _id: userId,
      });

      updateUser.avatar = imageUrl(updateUser.avatar);

      res.status(200).json({ data: updateUser, message: 'updated' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const findUser = await User.findById({ _id: userId });
      if (!findUser)
        throw new HttpException(409, "User doesn't exist");

      await User.deleteOne({ _id: userId });

      findUser.avatar = imageUrl(findUser.avatar);
      res.status(200).json({ data: findUser, message: 'deleted' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}

export default UsersController;
