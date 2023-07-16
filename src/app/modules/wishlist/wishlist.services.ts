import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import { IWishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";

const addToWishlist = async (
  wishlistData: IWishlist
): Promise<IWishlist | null> => {
  const isExists = await Wishlist.findOne({
    $and: [{ userEmail: wishlistData.userEmail }, { book: wishlistData.book }],
  });
  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Already added to wish list");
  }
  const result = await Wishlist.create(wishlistData);
  await result.populate("book");
  return result;
};

const getWishlist = async (userEmail: string): Promise<IWishlist[] | null> => {
  const result = await Wishlist.find({ userEmail }).populate("book");
  return result;
};

const removeFromWishlist = async (id: string): Promise<IWishlist | null> => {
  const result = await Wishlist.findByIdAndDelete({ _id: id });
  return result;
};

const updateQuantity = async (
  id: string,
  action: string
): Promise<IWishlist | null> => {
  if (action === "increment") {
    const result = await Wishlist.findByIdAndUpdate(id, {
      $inc: { quantity: 1 },
    });
    return result;
  } else {
    const result = await Wishlist.findByIdAndUpdate(id, {
      $inc: { quantity: -1 },
    });
    return result;
  }
};

const getSingleWishListItem = async (
  bookId: string,
  userEmail: string
): Promise<IWishlist | null> => {
  const result = await Wishlist.findOne({ userEmail, book: bookId }).populate(
    "book"
  );
  return result;
};

export const WishlistService = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  updateQuantity,
  getSingleWishListItem,
};
