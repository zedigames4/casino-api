import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  minimumBalance: {
    type: Number,
    default: 0,
  },
  isMain: {
    type: Boolean,
    default: false,
  },
  expenses: {
    type: Number,
    required: true,
    default: 0,
  },
  income: {
    type: Number,
    required: true,
    default: 0,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

WalletSchema.set('timestamps', true);

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;
