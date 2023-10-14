import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  coinToRwf: {
    type: Number,
    required: true,
    default: 1079.04,
  },
  isGlobal: {
    type: Boolean,
    default: false,
  },
});

SettingSchema.set('timestamps', true);

const Setting = mongoose.model('Setting', SettingSchema);

export default Setting;
