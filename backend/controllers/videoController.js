// controllers/video.controller.js
import Video from "../models/videoModel.js";
import Channel from "../models/channelModel.js";

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl, channelId, category } = req.body;

    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not the owner of this channel" });
    }

    const newVideo = new Video({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      channelId,
      category,
      uploader: req.user._id,
    });

    const savedVideo = await newVideo.save();

    // Push to channel.videos array
    channel.videos.push(savedVideo._id);
    await channel.save();

    res.status(201).json({ message: "Video uploaded", video: savedVideo });
  } catch (err) {
    res.status(500).json({ message: "Failed to upload video", error: err.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("channelId", "channelName").sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channelId", "channelName")
      .populate("uploader", "username avatar");
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch video", error: err.message });
  }
};


export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user._id;

    // Remove dislike if present
    video.dislikes = video.dislikes.filter(id => id.toString() !== userId.toString());

    // Toggle like
    if (video.likes.includes(userId)) {
      video.likes = video.likes.filter(id => id.toString() !== userId.toString());
    } else {
      video.likes.push(userId);
    }

    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to like video", error: err.message });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user._id;

    // Remove like if present
    video.likes = video.likes.filter(id => id.toString() !== userId.toString());

    // Toggle dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId.toString());
    } else {
      video.dislikes.push(userId);
    }

    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to dislike video", error: err.message });
  }
};


