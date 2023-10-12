/* eslint-disable @typescript-eslint/no-explicit-any */
//!
// export type IProperty = {
//   name: string;
//   age: number;
//   price: number;
//   location:
//     | 'Dhaka'
//     | 'Chattogram'
//     | 'Barishal'
//     | 'Rajshahi'
//     | 'Sylhet'
//     | 'Comilla'
//     | 'Rangpur'
//     | 'Mymensingh';

import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IRoom } from '../category/category.interface';

//   breed:
//     | 'Brahman'
//     | 'Nellore'
//     | 'Sahiwal'
//     | 'Gir'
//     | 'Indigenous'
//     | 'Tharparkar'
//     | 'Kankrej';
//   weight: number;
//   label: 'for sale' | 'sold out';
//   category: 'Dairy' | 'Beef' | 'Dual Purpose';
//   seller: Types.ObjectId | IUser;
// };
//!
// export type IComment = {
//   user: IUser;
//   question: string;
//   questionReplies: IComment[];
// };
// export type IReview = {
//   user: IUser;
//   rating: number;
//   comment: string;
//   commentReplies?: IComment[];
// };
// export type IServiceData = {};

// export type PropertyModel = Model<IProperty, Record<string, unknown>>;

type LocationEnum =
  | 'Cox Bazar'
  | 'Dhaka'
  | 'Sylhet'
  | 'Chittagong'
  | 'Sreemangal'
  | 'Kuakata'
  | 'Rajshahi'
  | 'Bandarban'
  | 'Gazipur'
  | 'Khulna';

type Review = {
  user: Types.ObjectId | IUser;
  rating: number;
  comment?: string;
  commentReplies: Array<Record<string, any>>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Service = {
  name: string;
  location: LocationEnum;
  thumbnail: {
    public_id?: string;
    url?: string;
  };
  facilities: Array<{ title: string }>;
  ratings: Array<Review>;
  // rooms: Array<string>;
  rooms: Types.ObjectId | IRoom;
  createdAt?: Date;
  updatedAt?: Date;
};
export type IServicesFilters = {
  searchTerm?: string;
  category?: string;
  propertyLocation?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
};
