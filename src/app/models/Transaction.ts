import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  adminWallet: {
    type: mongoose.Types.ObjectId,
    ref: 'Wallet',
    required: false,
  },
  withdrawRequestId: {
    type: mongoose.Types.ObjectId,
    ref: 'WithdrawRequest',
  },
  status: {
    type: String,
    enum: [
      'SUCCESSFUL',
      'PENDING',
      'FAILED',
      'UNKNOWN_ACCOUNT',
      'TIMEOUT',
      'DECLINED',
      'ERRONEOUS',
      'FAILURE',
      'INVALID_PIN',
      'ACCOUNT_NOT_ACTIVE',
      'BELOW_MINIMUM_ALLOWED_AMOUNT',
      'NO_SUFFICIENT_FUNDS',
      'ACCOUNT_NOT_FOUND',
      'ABOVE_MAXIMUM_ALLOWED_AMOUNT',
      'DUPLICATED_TRANSACTION_ID',
    ],
    required: true,
  },
  referenceId: {
    type: String,
  },
  mode: {
    type: String,
  },
  action: {
    type: String,
    enum: ['deposit', 'transfer', 'withdraw'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['RWF'],
    default: 'RWF',
  },
  chargedCommission: {
    type: Number,
    default: 0,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  commission: {
    type: Number,
    default: 0,
  },
  transferedAmount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

TransactionSchema.set('timestamps', true);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
