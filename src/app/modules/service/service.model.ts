import { Schema, model } from 'mongoose';
import { LocationEnum } from './service.constants';

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
const bookingSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
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
const ServiceSchema = new Schema(
  {
    propertyName: {
      type: String,
      required: [true, 'propertyName is required'],
    },
    propertyLocation: {
      type: String,
      enum: LocationEnum,
      require: true,
    },
    roomTitle: {
      type: String,
      required: [true, 'roomTitle is required'],
    },
    bedTitle: {
      type: String,
      required: [true, 'bedTitle is required'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    propertyDetails: {
      type: String,
      required: [true, 'propertyDetails is required'],
    },
    availablity: {
      type: String,
      required: [true, 'availablity is required'],
    },
    numberOfGuest: {
      type: String,
      required: [true, 'numberOfGuest is required'],
    },
    houseRules: {
      type: String,
      required: [true, 'houseRules is required'],
    },

    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    facilities: {
      type: String,
      required: [true, 'facilities is required'],
    },
    reviews: [reviewSchema],

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    bookings: [bookingSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Service = model('Service', ServiceSchema);
