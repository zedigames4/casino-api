import { Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { RequestWithUser } from '../interfaces/auth.interface';
import Bet from '../models/Bet';

export default class StatController {
  static incomeExpense = async (
    req: RequestWithUser,
    res: Response,
  ) => {
    try {
      const now = new Date();
      let startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      let endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
      );

      if (req.query.startDate) {
        startDate = new Date(req.query.startDate as string);
        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          1,
        );
      }

      if (req.query.endDate) {
        endDate = new Date(req.query.endDate as string);
        endDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          0,
        );
      }

      if (endDate.getTime() < startDate.getTime()) {
        throw new HttpException(
          400,
          'Invalid ending date, at least one month late',
        );
      }

      const myBets = await Bet.find({
        user: req.user._id,
        createdAt: { $gte: startDate, $lt: endDate },
      }).select('iWin iToBet createdAt');

      // console.log(myBets);

      const totalIncome = myBets.reduce(
        (acc, bet) => acc + bet.iWin,
        0,
      );
      const totalExpense = myBets.reduce(
        (acc, bet) => acc + bet.iToBet,
        0,
      );

      res.status(200).json({
        data: { totalIncome, totalExpense },
        message: 'findOne',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static getChartData = async (
    req: RequestWithUser,
    res: Response,
  ) => {
    try {
      const now = new Date();
      let startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 12,
        1,
      );
      let endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
      );

      if (req.query.startDate) {
        startDate = new Date(req.query.startDate as string);
        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          1,
        );
      }

      if (req.query.endDate) {
        endDate = new Date(req.query.endDate as string);
        endDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          0,
        );
      }

      if (endDate.getTime() < startDate.getTime()) {
        throw new HttpException(
          400,
          'Invalid ending date, at least one month late',
        );
      }

      const data = await Bet.aggregate([
        {
          $match: {
            user: req.user._id,
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' },
            },
            totalIncome: { $sum: '$iWin' },
            totalExpense: { $sum: '$iToBet' },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 },
        },
      ]);

      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Expenses',
            data: [],
          },
          {
            label: 'Income',
            data: [],
          },
        ],
      };

      data.forEach(group => {
        const label = `${group._id.month}-01-${group._id.year}`;
        chartData.labels.push(label);
        chartData.datasets[0].data.push(group.totalExpense);
        chartData.datasets[1].data.push(group.totalIncome);
      });

      res.status(200).json({
        data: chartData,
        message: 'findOne',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
