/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from 'ejs';
import jwt, { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/Apierror';
import {
  IActivationToken,
  IProfilePicture,
  IRegistration,
  IUser,
} from './user.interface';
import path from 'path';
import User from './user.model';
import config from '../../../config';
import sendEmail from '../../../utils/sendMail';
import cloudinary from 'cloudinary';
// const createUser = async (userData: IUser): Promise<IUser | null> => {
//   const newUser = await User.create(userData);

//   return newUser;
// };
//!
const createUser = async (payload: IRegistration) => {
  const { name, email, password, role } = payload;
  const user = {
    name,
    email,
    password,
    role,
  };

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }

  const activationToken = createActivationToken(user);
  const activationCode = activationToken.activationCode;
  const data = { user: { name: user.name }, activationCode };
  await ejs.renderFile(
    path.join(__dirname, '../../../mails/activation-mail.ejs'),
    data,
  );
  try {
    await sendEmail({
      email: user.email,
      subject: 'Activate Your Account',
      template: 'activation-mail.ejs',
      data,
    });
  } catch (error: any) {
    throw new ApiError(500, `${error.message}`);
  }
  return {
    activationToken: activationToken.token,
    user,
  };
};
//!
const createActivationToken = (user: IRegistration): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    config.activation_secret as Secret,
    {
      expiresIn: '5m',
    },
  );
  return { token, activationCode };
};
//!
const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};
const updateProfilePicture = async (req: Request) => {
  const { avatar } = req.body as any;

  //@ts-ignore
  const userId = req?.user?._id;
  const user = await User.findById(userId);

  if (avatar && user) {
    if (user?.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    }
  }
  await user?.save();

  return user;
};
const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'User not found !');
  }

  const { ...UserData } = payload;

  const updatedUserData: Partial<IUser> = { ...UserData };

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateProfilePicture,
};
