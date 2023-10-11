/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';

export type IUser = {
  _id?: string;
  name: string;
  email: string;
  image?: {
    public_id: string;
    url: string;
  };
  password: string;
  location?: string;
  role?: ENUM_USER_ROLE;
};
export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
