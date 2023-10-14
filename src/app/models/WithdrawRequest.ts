import mongoose from 'mongoose';

const WithdrawRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adminWallet: {
    type: mongoose.Types.ObjectId,
    ref: 'Wallet',
  },
  receiverPhoneNumber: {
    type: String,
  },
  approvedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  status: {
    type: String,
    enum: ['APPROVED', 'PENDING', 'REJECTED', 'FAILED'],
    default: 'PENDING',
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
});

WithdrawRequestSchema.set('timestamps', true);

const WithdrawRequest = mongoose.model(
  'WithdrawRequest',
  WithdrawRequestSchema,
);

export default WithdrawRequest;
