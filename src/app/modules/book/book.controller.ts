import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IBook } from "./book.interface";
import { BookService } from "./book.services";

const addBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;
  const result = await BookService.addBook(bookData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New book added successfully",
    data: result,
  });
});

const getLatestBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getLatestBooks();

  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Latest books retrived successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();

  sendResponse<IBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All books retrived successfully",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book retrived successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book deleted successfully",
    data: result,
  });
});

const editBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await BookService.editBook(id, updatedData);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book updated successfully",
    data: result,
  });
});

const addComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  const result = await BookService.addComment(id, comment);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment added successfully",
  });
});

export const BookController = {
  addBook,
  getLatestBooks,
  getAllBooks,
  getSingleBook,
  deleteBook,
  editBook,
  addComment,
};
