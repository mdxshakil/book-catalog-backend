import { Types } from "mongoose";

export interface IWishlist {
  userEmail: string;
  book: Types.ObjectId;
  quantity: number;
}
