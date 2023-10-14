import mongoose from 'mongoose';
import { BET_STATUS } from '../utils/constants';

const BetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  game: {
    type: mongoose.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  iWin: {
    type: Number,
  },
  iToBet: {
    type: Number,
  },
  playerData: {},
  status: {
    type: String,
    enum: BET_STATUS,
    default: 'BETTING',
  },
  startTime: {
    type: Date,
  },
  endingTime: {
    type: Date,
  },
});

BetSchema.set('timestamps', true);

const Bet = mongoose.model('Bet', BetSchema);

export default Bet;

export const getMonthlyTotals = async (
  startDate: Date,
  endDate?: Date,
) => {
  const startOfMonth = new Date(
    Date.UTC(startDate.getFullYear(), startDate.getMonth(), 1),
  );
  let endOfMonth = new Date(
    Date.UTC(startDate.getFullYear(), startDate.getMonth() + 1, 0),
  );

  if (endDate) {
    endOfMonth = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), 0),
    );
  }

  const bets = await Bet.find({
    createdAt: { $gte: startOfMonth, $lt: endOfMonth },
  });

  const totalIncome = bets.reduce((acc, bet) => acc + bet.iWin, 0);
  const totalExpense = bets.reduce((acc, bet) => acc + bet.iToBet, 0);

  return { totalIncome, totalExpense };
};
