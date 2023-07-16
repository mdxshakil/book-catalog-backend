import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import { Wishlist } from "../wishlist/wishlist.model";
import { ReadingList } from "../readinglist/readinglist.model";

const addBook = async (bookData: IBook) => {
  const newBook = await Book.create(bookData);
  return newBook;
};

const getLatestBooks = async () => {
  const latestBooks = await Book.find().sort({ createdAt: "desc" }).limit(10);
  return latestBooks;
};

const getAllBooks = async () => {
  const books = await Book.find();
  return books;
};

const getSingleBook = async (id: string) => {
  const book = await Book.findOne({ _id: id });
  return book;
};

const deleteBook = async (id: string) => {
  const book = await Book.findByIdAndDelete({ _id: id });
  await Wishlist.deleteOne({ book: id });
  await ReadingList.deleteOne({ book: id });
  return book;
};

const editBook = async (
  id: string,
  updatedData: Partial<IBook>
): Promise<IBook | null> => {
  const book = await Book.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).exec();
  return book;
};

const addComment = async (id: string, comment: string) => {
  const result = await Book.updateOne(
    { _id: id },
    { $push: { reviews: comment } }
  );
  return result;
};

export const BookService = {
  addBook,
  getLatestBooks,
  getAllBooks,
  getSingleBook,
  deleteBook,
  editBook,
  addComment,
};
