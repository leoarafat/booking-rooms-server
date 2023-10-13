import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  totalPrice: {
    type: Number,
    required: true,
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
    required: true,
  },
});
export const Booking = model('Booking', bookingSchema);
