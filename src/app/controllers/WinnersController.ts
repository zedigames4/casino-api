import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Bet from '../models/Bet';
import Setting from '../models/Setting';
import Wallet from '../models/Wallet';
import { BET_STATUS, CIPHER } from '../utils/constants';
import { isRoleAllowed } from '../utils/helper';
import { paginate } from '../utils/pagination';
import User from '../models/User';

export default class WinnersController {
  static encryptUser(user: Record<string, any>) {
    if (!user) {
      return null;
    }
    const name = user.firstName.toLowerCase();
    let result = '';

    for (let i = 0; i < name.length; i += 1) {
      const replacements = CIPHER[name[i]];
      const index = Math.floor(Math.random() * replacements.length);
      result += replacements[index];
    }

    return result.toUpperCase();
  }

  static biggest = async (req: RequestWithUser, res: Response) => {
    try {
      const limit = Number(req.query.limit || 10);
      let isEncrypted = Number(req.query.isEncrypted || 0);
      if (!req.user || !isRoleAllowed(req.user.role)) {
        isEncrypted = 1;
      }

      const allData = await Bet.aggregate([
        {
          $group: {
            _id: '$user',
            totalWin: { $sum: '$iWin' },
          },
        },
        {
          $sort: { totalWin: -1 },
        },
        {
          $limit: limit,
        },
      ]);

      const userIds = allData.map(item => item._id);

      const users = await User.find({ _id: { $in: userIds } }).select(
        'firstName lastName phoneNumber email',
      );

      // create a map of user documents by their ids
      const userMap = users.reduce((acc, user) => {
        acc[user._id as any] = user;
        return acc;
      }, {});

      // replace the user ids in the allData array with the corresponding user documents
      const populatedWinners = allData
        .map(item => ({
          user: !isEncrypted
            ? userMap[item._id]
            : WinnersController.encryptUser(userMap[item._id]),
          totalWin: item.totalWin.toFixed(2),
        }))
        .filter(item => !!item.user);

      res
        .status(200)
        .json({ data: populatedWinners, message: 'findAll' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static latest = async (req: RequestWithUser, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;
      const sort = String(req.query.sort || 'createdAt');
      let isEncrypted = Number(req.query.isEncrypted || 0);

      if (!req.user || !isRoleAllowed(req.user.role)) {
        isEncrypted = 1;
      }

      const query: Record<string, any> = {
        $or: [{ status: 'WIN' }, { status: 'LOOSE' }],
        $expr: { $gt: ['$iWin', '$iToBet'] },
      };

      const allData = await Bet.find(query)
        .select('user game iWin iToBet status createdAt')
        .populate('user', '-_id firstName lastName email')
        .populate('game', '-_id title')
        .sort({ [sort]: -1 })
        .skip(offset)
        .limit(limit);

      const count = await Bet.count(query);

      const pagination = paginate(count, limit, page);

      const results = allData.map(item => {
        const element = item.toJSON();
        return {
          betId: (element as any)._id,
          user: isEncrypted
            ? WinnersController.encryptUser(element.user)
            : element.user,
          game: element.game,
          profit: (element.iWin - element.iToBet).toFixed(2),
        };
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
}
