import express from "express";
import { ReadingListController } from "./readinglist.controller";
const router = express.Router();

router.post("/add-to-readingList", ReadingListController.addToReadingList);
router.get("/", ReadingListController.getReadingList);
router.delete("/:id", ReadingListController.removeFromReadingList);
router.patch("/:id", ReadingListController.updateReadStatus);

export const ReadingListRoutes = router;
