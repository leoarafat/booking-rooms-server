// import { Schema, model } from 'mongoose';

// // room Schema
// const RoomSchema = new Schema(
//   {
//     title: {
//       type: String,
//       require: true,
//     },
//     thumbnail: {
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
// export const Room = model('Room', RoomSchema);
import { Schema, model } from 'mongoose';
import { LocationEnum } from '../service/service.constants';

// room Schema
const CategorySchema = new Schema(
  {
    category: {
      type: String,
      enum: LocationEnum,
      require: true,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Category = model('Category', CategorySchema);
