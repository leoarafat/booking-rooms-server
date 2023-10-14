import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  serviceId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'adjusted'],
    default: 'pending',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
export const Booking = model('Booking', bookingSchema);
