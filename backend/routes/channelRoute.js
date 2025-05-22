import express from "express";
import {
  createChannel,
  getChannelById,
  getUserChannels,
} from "../controllers/channelController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChannel); // create channel
router.get("/my-channels", protect, getUserChannels); // get user's channels
router.get("/:id", getChannelById); // get specific channel

export default router;
