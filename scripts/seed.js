const bcrypt = require('bcryptjs');
const connectDB = require('../src/config/db');
const env = require('../src/config/env');
const User = require('../src/models/user.model');
const Ride = require('../src/models/ride.model');
const Booking = require('../src/models/booking.model');
const logger = require('../src/utils/logger');

const seed = async () => {
  await connectDB();

  await Promise.all([
    Booking.deleteMany({}),
    Ride.deleteMany({}),
    User.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash('Password123', env.bcryptSaltRounds);

  const [admin, driver, rider] = await User.create([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '9999999999',
      password: passwordHash,
      role: 'admin',
      isVerified: true,
    },
    {
      name: 'Driver Demo',
      email: 'driver@example.com',
      phone: '8888888888',
      password: passwordHash,
      role: 'user',
      isVerified: true,
    },
    {
      name: 'Rider Demo',
      email: 'rider@example.com',
      phone: '7777777777',
      password: passwordHash,
      role: 'user',
      isVerified: true,
    },
  ]);

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setUTCHours(10, 0, 0, 0);

  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 2);
  nextDay.setUTCHours(14, 30, 0, 0);

  const rides = await Ride.create([
    {
      driverId: driver._id,
      from: 'Delhi',
      to: 'Chandigarh',
      date: tomorrow,
      time: '10:00',
      price: 799,
      seats: 3,
      vehicle: 'Hyundai Creta',
      notes: 'Pickup near metro station',
    },
    {
      driverId: driver._id,
      from: 'Mumbai',
      to: 'Pune',
      date: nextDay,
      time: '14:30',
      price: 599,
      seats: 2,
      vehicle: 'Honda City',
      notes: 'One small bag included',
    },
  ]);

  logger.info('Seed completed', {
    users: [
      { email: admin.email, password: 'Password123', role: admin.role },
      { email: driver.email, password: 'Password123', role: driver.role },
      { email: rider.email, password: 'Password123', role: rider.role },
    ],
    rides: rides.map((ride) => ({
      id: ride._id.toString(),
      from: ride.from,
      to: ride.to,
      seats: ride.seats,
    })),
  });
};

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error('Seed failed', { error: error.message });
    process.exit(1);
  });
