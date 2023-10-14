import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Bet from '../models/Bet';
import Setting from '../models/Setting';
import Wallet from '../models/Wallet';
import { BET_STATUS } from '../utils/constants';
import { isRoleAllowed } from '../utils/helper';
import { paginate } from '../utils/pagination';

export default class BetController {
  static getAll = async (req: RequestWithUser, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;
      const sort = String(req.query.sort || 'createdAt');

      const query: Record<string, any> = {};

      if (!isRoleAllowed(req.user.role)) {
        query.user = req.user._id;
      }

      const betStatus = req.query.status as string;

      if (betStatus && BET_STATUS.includes(betStatus.toUpperCase())) {
        query.status = betStatus;
      }

      const allData = await Bet.find(query)
        .select('user game iWin iToBet status createdAt')
        .populate('user', '-_id firstName lastName email')
        .populate('game', '-_id title')
        .sort({ [sort]: -1 })
        .skip(offset)
        .limit(limit);
      const count = await Bet.count(query);

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

  static publicGetAll = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;
      const sort = String(req.query.sort || 'startTime');

      const query: Record<string, any> = {};

      const betStatus = req.query.status as string;

      if (betStatus && BET_STATUS.includes(betStatus.toUpperCase())) {
        query.status = betStatus;
      }

      const allData = await Bet.find(query)
        .populate('user', '-_id firstName lastName email')
        .populate('game', '-_id title')
        .sort({ [sort]: -1 })
        .skip(offset)
        .limit(limit);
      const count = await Bet.count(query);

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

      const findOne = await Bet.findById(id)
        .populate('user', '-_id firstName lastName email')
        .populate('game', '-_id title');
      if (!findOne) throw new HttpException(409, "Bet doesn't exist");

      res.status(200).json({
        data: {
          ...findOne.toJSON(),
          balanceInCoin: req.user.balanceInCoin,
        },
        message: 'findOne',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static create = async (req: RequestWithUser, res: Response) => {
    try {
      if (['admin'].includes(req.user.role)) {
        throw new HttpException(401, 'Admin is not allowed to bet.');
      }

      const itemData: any = req.body;
      itemData.user = req.user._id;
      let { iWin = 0, iToBet = 0 } = itemData;

      const adminWallet = await Wallet.findById(req.adminWallet._id);

      if (!adminWallet) {
        throw new HttpException(
          409,
          'Wait for admin to set up wallet',
        );
      }

      if (adminWallet.minimumBalance >= adminWallet.balance) {
        throw new HttpException(403, 'Insufficient balance');
      }

      if (itemData.currency === 'COIN') {
        const rwf = req.globalSetting?.coinToRwf || 1;
        iWin *= rwf;
        iToBet *= rwf;
      }

      itemData.iWin = iWin;
      itemData.iToBet = iToBet;

      const wallet = await Wallet.findOne({ user: req.user._id });

      if (!wallet) {
        throw new HttpException(409, 'Please, add wallet');
      }

      wallet.set({
        balance: wallet.balance + itemData.iWin - itemData.iToBet,
        expenses: wallet.expenses + itemData.iToBet,
        income: wallet.income + itemData.iWin,
      });

      await wallet.save();

      adminWallet.set({
        balance:
          adminWallet.balance + itemData.iWin + itemData.iToBet,
        expenses: adminWallet.expenses + itemData.iWin,
        income: adminWallet.income - itemData.iWin,
      });

      await adminWallet.save();

      const createItemData = new Bet(itemData);

      const newData = await createItemData.save();

      const balanceInCoin =
        wallet.balance / (req.globalSetting.coinToRwf || 1);

      res.status(201).json({
        data: {
          ...newData.toJSON(),
          balanceInCoin,
        },
        message: 'created',
      });
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
      const findOne = await Bet.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne) throw new HttpException(409, "Bet doesn't exist");

      const adminWallet = await Wallet.findById(req.adminWallet._id);

      let { iWin = 0, iToBet = 0 } = itemData;

      const setting = await Setting.findOne({ isGlobal: true });

      if (itemData.currency === 'COIN') {
        const rwf = setting?.coinToRwf || 1;
        iWin *= rwf;
        iToBet *= rwf;
      }
      itemData.iWin = findOne.iWin + iWin;
      itemData.iToBet = findOne.iToBet + iToBet;

      const wallet = await Wallet.findOne({ user: req.user._id });

      if (!wallet) {
        await Wallet.create({ user: req.user._id });
      }

      wallet.set({
        balance: wallet.balance + iWin - iToBet,
        expenses: wallet.expenses + iToBet,
        income: wallet.income + iWin,
      });

      await wallet.save();

      adminWallet.set({
        balance:
          adminWallet.balance + itemData.iWin + itemData.iToBet,
        expenses: adminWallet.expenses + itemData.iWin,
        income: adminWallet.income - itemData.iWin,
      });

      await adminWallet.save();

      findOne.set(itemData);

      const updateItem = await findOne.save();

      const balanceInCoin =
        wallet.balance / (req.globalSetting.coinToRwf || 1);

      res.status(200).json({
        data: { ...updateItem.toJSON(), balanceInCoin },
        message: 'updated',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static delete = async (req: RequestWithUser, res: Response) => {
    try {
      const { id } = req.params;
      const findOne = await Bet.findOne({
        _id: id,
        user: req.user._id,
      });
      if (!findOne) throw new HttpException(409, "Bet doesn't exist");

      await Bet.deleteOne({ _id: id });
      res.status(200).json({ data: findOne, message: 'deleted' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
