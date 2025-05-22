import express from "express";
import { uploadVideo, getAllVideos, getVideoById } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, uploadVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoById);

export default router;
