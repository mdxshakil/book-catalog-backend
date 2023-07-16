import { Types } from "mongoose";
import { Model } from "mongoose";

export type IBook = {
  userEmail: string;
  title: string;
  author: string;
  genre:
    | "Fiction"
    | "Thriller"
    | "Science Fiction"
    | "Romance"
    | "Historical Fiction"
    | "Biography"
    | "Young Adult"
    | "Self-help"
    | "Business"
    | "Horror"
    | "Travel"
    | "Music";
  publicationDate: Date;
  image?: string;
  reviews?: Array<string>;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
