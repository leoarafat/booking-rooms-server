/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import cloudinary from 'cloudinary';
import { Service } from './service.model';
import { Category } from '../category/category.model';
import ApiError from '../../../errors/Apierror';

//!
const createService = async (payload: any) => {
  const thumbnail = payload.thumbnail;
  if (thumbnail && typeof thumbnail === 'string') {
    const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
      folder: 'services',
    });
    payload.thumbnail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const result = await Service.create(payload);
  const categoryId = payload.category;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  category.services.push(result._id);
  await category.save();

  return result;
};

//!
const getSingleService = async (id: string) => {
  const service = await Service.findById(id);
  return service;
};

//!

export const ServicesService = {
  createService,
  getSingleService,
};
