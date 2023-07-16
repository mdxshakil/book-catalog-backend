import { Schema, Types, model } from "mongoose";
import { IReadingList } from "./readinglist.interface";

const readingListSchema = new Schema<IReadingList>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    hasRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ReadingList = model<IReadingList>(
  "ReadingList",
  readingListSchema
);
