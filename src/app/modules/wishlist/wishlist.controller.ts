import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { WishlistService } from "./wishlist.services";
import { IWishlist } from "./wishlist.interface";

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const wishlistData = req.body;
  const result = await WishlistService.addToWishlist(wishlistData);

  sendResponse<IWishlist>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Added to wishlist",
    data: result,
  });
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.query.email;
  const result = await WishlistService.getWishlist(userEmail as string);

  sendResponse<IWishlist[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wishlist retrived successfully",
    data: result,
  });
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WishlistService.removeFromWishlist(id);

  sendResponse<IWishlist>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Item deleted successfully",
    data: result,
  });
});

const updateQuantity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { action } = req.body;
  const result = await WishlistService.updateQuantity(id, action);

  sendResponse<IWishlist>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quantity updated succesfully",
    data: result,
  });
});

const getSingleWishListItem = catchAsync(
  async (req: Request, res: Response) => {
    const userEmail = req.query.email;
    const {id} = req.params; //book id
    const result = await WishlistService.getSingleWishListItem(id,userEmail as string);

    sendResponse<IWishlist>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Wishlist item retrived successfully",
      data: result,
    });
  }
);

export const WishlistController = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  updateQuantity,
  getSingleWishListItem,
};
