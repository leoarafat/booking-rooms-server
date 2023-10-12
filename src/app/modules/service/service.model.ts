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
      type: String,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Service = model('Service', ServiceSchema);

// import { Schema, model } from 'mongoose';
// import { LocationEnum } from './service.constants';

// const reviewSchema = new Schema(
//   {
//     user: Object,
//     rating: {
//       type: Number,
//       default: 0,
//     },
//     comment: String,
//     commentReplies: [Object],
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

// const commentSchema = new Schema(
//   {
//     user: Object,
//     question: String,
//     questionReplies: [Object],
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

// const roomSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     roomThumbnail: {
//       public_id: {
//         type: String,
//       },
//       url: {
//         type: String,
//       },
//     },
//     facilities: [{ title: String }],
//     category: {
//       type: String,
//       enum: ['delux', 'delux king', 'delux twin'],
//     },
//     bedSize: {
//       type: Number,
//     },
//     pricing: {
//       type: Number,
//     },
//     roomSize: {
//       type: String,
//     },
//     description: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

// const ServiceSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'name is required'],
//     },
//     location: {
//       type: String,
//       enum: LocationEnum,
//       required: true,
//     },
//     thumbnail: {
//       public_id: {
//         type: String,
//       },
//       url: {
//         type: String,
//       },
//     },
//     reviewAndRatings: [reviewSchema],
//     comments: [commentSchema],
//     rooms: [roomSchema],
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   },

//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

// export const Service = model('Service', ServiceSchema);
