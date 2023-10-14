import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Setting from '../models/Setting';
import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';
import { paginate } from '../utils/pagination';

export default class WalletController {
  static getAll = async (req: RequestWithUser, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const where: Record<string, any> = {};

      if (req.user.role !== 'admin') {
        where.user = req.user._id;
      }

      const allData = await Wallet.find(where)
        .skip(offset)
        .limit(limit);
      const count = await Wallet.count(where);

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

  static getMyWallet = async (
    req: RequestWithUser,
    res: Response,
  ) => {
    try {
      const findOne = await Wallet.findOne({
        user: req.user._id,
      })
        .select('balance expenses income')
        .populate('user', '-_id firstName email');
      if (!findOne)
        throw new HttpException(409, "Wallet doesn't exist");

      const balanceInCoin =
        findOne.balance / (req.globalSetting.coinToRwf || 1);
      res.status(200).json({
        data: {
          ...findOne.toJSON(),
          balanceInCoin,
        },
        message: 'my wallet',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static getOne = async (req: any, res: Response) => {
    try {
      const { id } = req.params;

      const findOne = await Wallet.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne)
        throw new HttpException(409, "Wallet doesn't exist");

      res.status(200).json({ data: findOne, message: 'findOne' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static create = async (req: RequestWithUser, res: Response) => {
    try {
      const existWallet = await Wallet.findOne({
        user: req.user._id,
      });
      if (existWallet) {
        throw new HttpException(409, 'Wallet is already exist');
      }
      const itemData: any = req.body;

      if (req.user.role === 'admin') {
        const mainWallet = await Wallet.findOne({ isMain: true });
        if (!mainWallet) {
          itemData.isMain = true;
        }
      }
      const createItemData = new Wallet({
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

  static topup = async (req: RequestWithUser, res: Response) => {
    try {
      const itemData: any = req.body;
      // if ((req as any).amount) {
      //   itemData.amount = (req as any).amount;
      // }
      let myWallet = await Wallet.findOne({ user: req.user._id });
      if (!myWallet) {
        myWallet = await Wallet.create({
          user: req.user._id,
          balance: itemData.amount,
        });
      } else {
        myWallet.set({ balance: myWallet.balance + itemData.amount });
        myWallet = await myWallet.save();
      }

      await Transaction.create({
        user: req.user._id,
        status: 'SUCCESSFUL',
        mode: 'deposit',
        action: 'deposit',
        amount: itemData.amount,
      });

      res.status(201).json({ data: myWallet, message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static withdraw = async (req: RequestWithUser, res: Response) => {
    try {
      const itemData: any = req.body;
      let myWallet = await Wallet.findOne({ user: req.user._id });
      if (!myWallet) {
        throw new HttpException(409, 'No wallet found');
      }

      if (myWallet.balance < itemData.amount) {
        throw new HttpException(400, 'Balance is less');
      }

      myWallet.set({ balance: myWallet.balance - itemData.amount });
      myWallet = await myWallet.save();

      await Transaction.create({
        user: req.user._id,
        status: 'SUCCESSFUL',
        mode: 'withdraw',
        action: 'withdraw',
        amount: itemData.amount,
      });

      res.status(201).json({ data: myWallet, message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static async setMinimuBalance(req: RequestWithUser, res: Response) {
    try {
      const myWallet = await Wallet.findOne({
        user: req.user._id,
        isMain: true,
      });

      if (!myWallet) {
        throw new HttpException(
          409,
          'Your main wallet was not found, create one',
        );
      }
      myWallet.set({ minimumBalance: req.body.minimumBalance });
      res
        .status(200)
        .json({ data: await myWallet.save(), message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  }

  static async setMainWallet(req: RequestWithUser, res: Response) {
    try {
      const { id } = req.params;
      if (req.user.role !== 'admin') {
        throw new HttpException(401, 'You are not authorized');
      }

      const userWallet = await Wallet.findById(id).populate({
        path: 'user',
        match: { 'user.role': 'admin' },
      });

      if (!userWallet) {
        throw new HttpException(409, 'Wallet is not found');
      }

      const mainWallet = await Wallet.findOne({
        isMain: true,
      });

      if (mainWallet && mainWallet.id !== id) {
        mainWallet.set({ isMain: false });
        await mainWallet.save();
      }

      userWallet.set({ isMain: true });
      res.status(200).json({
        data: await userWallet.save(),
        message: 'set main wallet',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  }
}
