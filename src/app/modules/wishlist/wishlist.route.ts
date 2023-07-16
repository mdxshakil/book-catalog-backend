import express from "express";
import { WishlistController } from "./wishlist.controller";
const router = express.Router();

router.post("/add-to-wishlist", WishlistController.addToWishlist);
router.get("/", WishlistController.getWishlist);
router.delete("/:id", WishlistController.removeFromWishlist);
router.patch("/:id", WishlistController.updateQuantity);
router.get("/:id", WishlistController.getSingleWishListItem);

export const WishlistRoutes = router;
