import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/book/book.route";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route";
import { ReadingListRoutes } from "../modules/readinglist/readinglist.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/book",
    route: BookRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/readinglist",
    route: ReadingListRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
