const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
    vehicle: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

rideSchema.index({ from: 1, to: 1, date: 1, status: 1 });
rideSchema.index({ driverId: 1, date: -1 });

module.exports = mongoose.model('Ride', rideSchema);
