import { ReadingList } from "./readinglist.model";
import { IReadingList } from "./readinglist.interface";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const addToReadingList = async (
  readingListData: IReadingList
): Promise<IReadingList | null> => {
  const isExists = await ReadingList.findOne({
    $and: [
      { userEmail: readingListData.userEmail },
      { book: readingListData.book },
    ],
  });
  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Already added to reading list");
  }
  const result = await ReadingList.create(readingListData);
  await result.populate("book");
  return result;
};

const getReadingList = async (
  email: string
): Promise<IReadingList[] | null> => {
  const result = await ReadingList.find({ userEmail: email }).populate("book");
  return result;
};

const removeFromReadingList = async (
  id: string
): Promise<IReadingList | null> => {
  const result = await ReadingList.findByIdAndDelete({ _id: id });
  return result;
};

const updateReadStatus = async (id: string): Promise<IReadingList | null> => {
  const readingList = await ReadingList.findById(id);
  if (!readingList) {
    return null;
  }
  readingList.hasRead = !readingList.hasRead;
  await readingList.save();

  return readingList;
};

export const ReadingListService = {
  addToReadingList,
  getReadingList,
  removeFromReadingList,
  updateReadStatus,
};
