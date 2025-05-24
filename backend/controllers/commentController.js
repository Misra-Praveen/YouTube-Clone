import Comment from "../models/commentModel.js";
import Video from "../models/videoModel.js";

export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    if (!videoId || !text) {
      return res.status(400).json({ message: "Video ID and comment text are required." });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = new Comment({
      videoId,
      userId: req.user._id,
      text,
    });

    const savedComment = await comment.save();

    video.comments.push(savedComment._id);
    await video.save();

    // ✅ Try to populate the comment author
    const populatedComment = await Comment.findById(savedComment._id)
      .populate("userId", "username avatar");

    if (!populatedComment) {
      return res.status(500).json({ message: "Comment saved, but population failed" });
    }

    return res.status(201).json({ message: "Comment added", comment: populatedComment });
  } catch (err) {
    console.error("❌ addComment error:", err.message);
    return res.status(500).json({
      message: "Failed to add comment",
      error: err.message,
    });
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

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = req.body.text;
    await comment.save();

    const updated = await comment.populate("userId", "username avatar");
    res.status(200).json({ comment: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update comment", error: err.message });
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
