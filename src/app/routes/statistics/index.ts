import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import StatController from '../../controllers/StatController';
import StatisticsValidate from '../../validations/statistics';

const statisticsRouter = Router();

statisticsRouter.get(
  '/income-expenses',
  authMiddleware,
  StatisticsValidate.incomeExpenses,
  StatController.incomeExpense,
);

statisticsRouter.get(
  '/chart',
  authMiddleware,
  StatisticsValidate.incomeExpenses,
  StatController.getChartData,
);

export default statisticsRouter;
