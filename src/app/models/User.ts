import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'manager'],
    default: 'user',
  },
  lastName: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  referralCode: { type: String, required: true, unique: true },
  invitedFriends: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ],
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

UserSchema.set('timestamps', true);

const User = mongoose.model('User', UserSchema);

export default User;
