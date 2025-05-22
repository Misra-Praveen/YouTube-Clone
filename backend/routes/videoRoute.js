import express from "express";
import { uploadVideo, getAllVideos, getVideoById } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, uploadVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoById);

router.put("/:id/like", protect, likeVideo);
router.put("/:id/dislike", protect, dislikeVideo);


export default router;
