const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ride',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ rideId: 1, userId: 1, status: 1 });
bookingSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
