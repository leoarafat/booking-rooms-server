/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import cloudinary from 'cloudinary';
import { Service } from './service.model';
import { Category } from '../category/category.model';
import ApiError from '../../../errors/Apierror';
import { IServicesFilters } from './service.interface';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { servicesSearchableFields } from './service.constants';
import { SortOrder } from 'mongoose';

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
const getAllService = async (
  filters: IServicesFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<any[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: servicesSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
  getAllService,
};
