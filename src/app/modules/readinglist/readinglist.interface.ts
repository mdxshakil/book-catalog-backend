import { Model, Types } from "mongoose";

export interface IReadingList {
  userEmail: string;
  book: Types.ObjectId;
  hasRead: boolean;
}
