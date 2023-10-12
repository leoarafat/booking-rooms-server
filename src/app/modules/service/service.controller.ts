/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import cloudinary from 'cloudinary';
import sendResponse from '../../../shared/sendResponse';
import { ServicesService } from './service.service';
import { Service } from './service.model';
import pick from '../../../shared/pick';
import { servicesFilterableFields } from './service.constants';
import paginationFields from '../../../constants/pagination';

//!
const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await ServicesService.createService(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Service created successfully`,
      data: result,
    });
  },
);

//!
const updateService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const thumbnail = data.thumbnail;
    const serviceId = req.params.id;

    const serviceData = (await Service.findById(serviceId)) as any;

    if (thumbnail && !thumbnail.startsWith('https')) {
      await cloudinary.v2.uploader.destroy(serviceData.thumbnail.public_url);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: 'Service',
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

    const service = await Service.findByIdAndUpdate(
      serviceId,
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
      message: `Service updated successfully`,
      data: service,
    });
  },
);
//!
//!
const getAllService = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, servicesFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServicesService.getAllService(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
//!
const getSingleService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ServicesService.getSingleService(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Service retrieved by id successfully`,
      data: result,
    });
  },
);
export const ServiceController = {
  createService,
  updateService,
  getSingleService,
  getAllService,
};
