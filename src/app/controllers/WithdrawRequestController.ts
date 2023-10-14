import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import WithdrawRequest from '../models/WithdrawRequest';
import { paginate } from '../utils/pagination';
import Wallet from '../models/Wallet';
import { RequestWithUser } from '../interfaces/auth.interface';
import { imageUrl, isRoleAllowed } from '../utils/helper';

export default class WithdrawRequestController {
  static getAll = async (req: RequestWithUser, res: Response) => {
    try {
      const { status, userId } = req.query;
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;

      const where: Record<string, any> = {};

      if (status) {
        where.status = status;
      }
      if (userId) {
        where.requester = userId;
      }
      if (!isRoleAllowed(req.user.role)) {
        where.requester = req.user._id;
      }

      const allData = await WithdrawRequest.find(where)
        .sort({ createdAt: -1 })
        .populate([
          {
            path: 'requester',
            select: 'avatar phoneNumber firstName lastName email',
          },
          {
            path: 'approvedBy',
            select: 'firstName lastName email',
          },
        ])
        .skip(offset)
        .limit(limit);
      const count = await WithdrawRequest.count(where);

      const pagination = paginate(count, limit, page);

      const results = allData.map(item => {
        const avatar = (item.requester as any).avatar as string;
        if (avatar) {
          return {
            ...item.toJSON(),
            requester: {
              ...(item.requester as any)?.toJSON(),
              avatar: imageUrl(avatar),
            },
          };
        }
        return item;
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

  static getOne = async (req: any, res: Response) => {
    try {
      const { id } = req.params;

      const findOne = await WithdrawRequest.findById(id).populate([
        {
          path: 'requester',
          select: 'avatar phoneNumber firstName lastName email',
        },
        {
          path: 'approvedBy',
          select: 'firstName lastName email',
        },
      ]);
      if (!findOne)
        throw new HttpException(409, "Request doesn't exist");

      (findOne.requester as any).avatar = imageUrl(
        (findOne.requester as any)?.avatar,
      );

      res.status(200).json({ data: findOne, message: 'findOne' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static create = async (req: RequestWithUser, res: Response) => {
    try {
      const itemData = req.body;
      let myWallet = await Wallet.findOne({ user: req.user._id });
      if (!myWallet) {
        myWallet = await Wallet.create({ user: req.user._id });
      }
      if (!myWallet) {
        throw new HttpException(409, 'Your wallet does not exist');
      }
      const { amount } = req.body;

      const commission = (2 * amount * 2.5) / 100;

      if (amount + commission > myWallet.balance) {
        throw new HttpException(
          409,
          'Your balance is less, we charge 5%.',
        );
      }
      const createItemData = new WithdrawRequest({
        ...itemData,
        requester: req.user._id,
      });

      const newData = await createItemData.save();

      res.status(201).json({ data: newData, message: 'created' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static decide = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const request = await WithdrawRequest.findById(id);
      if (!request) {
        throw new HttpException(409, 'The request does not exist');
      }

      const decision = req.body.decision as 'APPROVED' | 'REJECTED';

      if (request.status === decision) {
        throw new HttpException(
          409,
          `Request is already ${decision}`,
        );
      }

      if (decision === 'APPROVED') {
        const requesterWallet = await Wallet.findOne({
          user: request.requester,
        });
        if (!requesterWallet) {
          throw new HttpException(
            409,
            'Requester wallet is not found',
          );
        }

        const mainWallet = await Wallet.findById(req.adminWallet._id);
        if (!mainWallet) {
          throw new HttpException(409, 'Admin wallet is not found');
        }

        const { amount } = request;

        const commission = (2 * amount * 2.5) / 100;

        if (amount + commission > requesterWallet.balance) {
          throw new HttpException(
            409,
            'Your balance is less, we charge 5%.',
          );
        }

        request.set({ approvedBy: req.user._id });
        await request.save();

        (req as any).request = request?.toJSON();
        next();
      } else {
        request.set({
          status: decision,
        });

        const newData = await request.save();
        res.status(201).json({ data: newData, message: decision });
      }
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
