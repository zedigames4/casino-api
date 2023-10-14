import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
import User from '../User';
import Keys from '../../keys';

const admin = {
  firstName: 'JACQUES',
  lastName: 'MANIRAGUHA',
  role: 'admin',
  verified: true,
  email: 'admin@zeddi.rw',
  password: Keys.ADMIN_PASSWORD || 'zEDDI@2022',
};

const seedAdmin = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(Keys.MONGO_DB_URL);

    const hashedPassword = await hash(admin.password, 10);

    const exist = await User.findOne({ email: admin.email });

    if (!exist) {
      const newUser = { ...admin, password: hashedPassword };
      await User.create(newUser);
      console.log('Admin created successfully');
    } else {
      exist.set({ ...admin, password: hashedPassword });
      await exist.save();
      console.log('Admin updated successfully');
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();

    console.log('User seeding complete.');
  } catch (err) {
    console.error(err);
  }
};

export default seedAdmin();
