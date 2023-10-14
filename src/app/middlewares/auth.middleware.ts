import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Keys from '../keys';
import User from '../models/User';
import Wallet from '../models/Wallet';
import Setting from '../models/Setting';

const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Authorization =
      req.cookies.Authorization ||
      (req.header('Authorization')
        ? req.header('Authorization').split('Bearer ')[1]
        : null);
    if (Authorization) {
      const secretKey: string = Keys.SECRET_KEY;
      const verificationResponse: any = verify(
        Authorization,
        secretKey,
      );
      const userId = verificationResponse.id;
      const findUser = await User.findById(userId);
      if (findUser) {
        req.user = findUser;
        req.user.token = Authorization;
        try {
          const adminWallet = await Wallet.findOne({
            isMain: true,
          }).populate({
            path: 'user',
            match: { 'user.role': 'admin' },
          });
          req.adminWallet = adminWallet?.toJSON();
        } catch (error) {
          req.globalSetting = {
            coinToRwf: 1,
          };
          console.log(error.message);
        }

        try {
          let myWallet = await Wallet.findOne({
            user: userId,
          }).populate({
            path: 'user',
          });
          if (!myWallet && userId) {
            myWallet = await Wallet.create({ user: userId });
          }
          req.myWallet = myWallet?.toJSON();
        } catch (error) {
          console.log(error.message);
        }

        try {
          const globalSetting = await Setting.findOne({
            isGlobal: true,
          });
          req.globalSetting = globalSetting?.toJSON();
          const { balance = 0 } = req.myWallet;
          const { coinToRwf = 1 } = globalSetting;
          req.user.balanceInCoin = balance / coinToRwf;
        } catch (error) {
          req.user.balanceInCoin = req.myWallet?.balance || 0;
          console.log(error.message);
        }

        next();
      } else {
        res.status(401).json({
          message: 'Wrong authentication token',
        });
      }
    } else {
      res.status(404).json({
        message: 'Authentication token missing',
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'Wrong authentication token',
    });
  }
};

export const allowedRoles = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;
    if (!user) {
      throw new HttpException(404, 'You are not authenticated');
    }
    const { role } = user;
    if (!['admin'].includes(role)) {
      throw new HttpException(401, 'You are not authorized');
    }
    next();
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || 'Something went ',
    });
  }
};

export default authMiddleware;
