import express from "express";
const router = express.Router();
import { BookController } from "./book.controller";

router.post("/add-book", BookController.addBook);
router.post("/comment/:id", BookController.addComment);
router.get("/latest-books", BookController.getLatestBooks);
router.get("/all-books", BookController.getAllBooks);
router.get("/:id", BookController.getSingleBook);
router.delete("/:id", BookController.deleteBook);
router.patch("/edit-book/:id", BookController.editBook);
export const BookRoutes = router;
