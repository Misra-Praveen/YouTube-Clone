import Comment from "../models/commentModel.js";
import Video from "../models/videoModel.js";

export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = new Comment({
      videoId,
      userId: req.user._id,
      text,
    });

    const savedComment = await comment.save();

    video.comments.push(savedComment._id);
    await video.save();

    res.status(201).json({ message: "Comment added", comment: savedComment });
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can delete only your own comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete comment", error: err.message });
  }
};
