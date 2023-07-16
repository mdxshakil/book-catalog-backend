import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, Record<string, never>, BookModel>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "Fiction",
        "Thriller",
        "Science Fiction",
        "Romance",
        "Historical Fiction",
        "Biography",
        "Young Adult",
        "Self-help",
        "Business",
        "Horror",
        "Travel",
        "Music",
      ],
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
    },
    reviews: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model<IBook, BookModel>("Book", bookSchema);
