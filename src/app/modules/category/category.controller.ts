/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchasync';

import cloudinary from 'cloudinary';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import pick from '../../../shared/pick';
import { categoryFilterableFields } from './category.constants';
import paginationFields from '../../../constants/pagination';

//!
const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await CategoryService.createCategory(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Category created successfully`,
      data: result,
    });
  },
);
//!
const updateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const thumbnail = data.thumbnail;
    const roomId = req.params.id;

    const serviceData = (await Category.findById(roomId)) as any;

    if (thumbnail && !thumbnail.startsWith('https')) {
      await cloudinary.v2.uploader.destroy(serviceData.thumbnail.public_url);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: 'category',
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
      if (thumbnail.startsWith('https')) {
        data.thumbnail = {
          public_id: serviceData?.thumbnail.public_id,
          url: serviceData?.thumbnail.url,
        };
      }
    }

    const service = await Category.findByIdAndUpdate(
      roomId,
      {
        $set: data,
      },
      {
        new: true,
        // runValidators: true,
      },
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Category updated successfully`,
      data: service,
    });
  },
);
//!
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await CategoryService.getAllCategory(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
//!
//!
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.deleteCategory(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});
//!
export const CategoryController = {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
};
