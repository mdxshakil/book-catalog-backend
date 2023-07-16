import { Schema, Types, model } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
