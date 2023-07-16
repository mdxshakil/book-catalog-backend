import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IReadingList } from "./readinglist.interface";
import { ReadingListService } from "./readinglist.services";

const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  const readingListData = req.body;
  const result = await ReadingListService.addToReadingList(readingListData);

  sendResponse<IReadingList>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Added to readinglist",
    data: result,
  });
});

const getReadingList = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await ReadingListService.getReadingList(email as string);

  sendResponse<IReadingList[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reading list retrived successfully",
    data: result,
  });
});

const removeFromReadingList = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ReadingListService.removeFromReadingList(id);

    sendResponse<IReadingList>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Item deleted successfully",
      data: result,
    });
  }
);

const updateReadStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReadingListService.updateReadStatus(id);

  sendResponse<IReadingList>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Status updated succesfully",
    data: result,
  });
});

export const ReadingListController = {
  addToReadingList,
  getReadingList,
  removeFromReadingList,
  updateReadStatus,
};
