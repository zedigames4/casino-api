import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import Transaction from '../models/Transaction';
import { isRoleAllowed } from '../utils/helper';
import { paginate } from '../utils/pagination';
import User from '../models/User';
import Wallet from '../models/Wallet';
import { RequestWithUser } from '../interfaces/auth.interface';

export default class TransferController {
  static getAll = async (req: any, res: Response) => {
    try {
      const { action, status, receiver, mode } = req.query;
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const where: Record<string, any> = { action: 'transfer' };

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
        .populate('user', '-_id firstName lastName email')
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
        action: 'transfer',
      }).populate('user', '-_id firstName lastName email');
      if (!findOne)
        throw new HttpException(409, "Transfer doesn't exist");

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
      const receiver = await User.findById(itemData.receiver);
      if (!receiver) {
        throw new HttpException(409, 'Receiver is not found');
      }

      const senderWallet = await Wallet.findOne({
        user: req.user._id,
      });

      let receiverWallet = await Wallet.findOne({
        user: itemData.receiver,
      });

      if (!receiverWallet) {
        receiverWallet = await Wallet.create({
          user: itemData.receiver,
        });
      }

      if (!senderWallet || !receiverWallet) {
        throw new HttpException(
          409,
          `${
            !receiverWallet ? 'Receiver' : 'Sender'
          } wallet is not exist`,
        );
      }

      if (itemData.amount > senderWallet.balance) {
        throw new HttpException(
          409,
          `Your balance: RWF${senderWallet.balance} is less than RWF${itemData.amount}`,
        );
      }

      const createItemData = new Transaction({
        ...itemData,
        status: 'SUCCESSFUL',
        user: req.user._id,
        action: 'transfer',
      });

      senderWallet.set({
        balance: senderWallet.balance - itemData.amount,
      });
      await senderWallet.save();

      receiverWallet.set({
        balance: receiverWallet.balance + itemData.amount,
      });
      await receiverWallet.save();

      const newData = await createItemData.save();

      res.status(201).json({ data: newData, message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
