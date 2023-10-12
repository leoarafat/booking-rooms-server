import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const insertIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await BookingService.insertIntoDB(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Room Booking successfully`,
      data: result,
    });
  },
);

export const BookingController = {
  insertIntoDB,
};
