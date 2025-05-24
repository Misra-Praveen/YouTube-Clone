import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CommentSection = ({ videoId }) => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log("userInfo is ", userInfo);
  // console.log("User ID:", userInfo?.user?.id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comments/${videoId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/comments`,
        {
          videoId,
          text: newComment,
        },
        config
      );
      // console.log('response', response)
      // setComments((prev) => [response.data.comment, ...prev]);
      if (response.data?.comment) {
    setComments((prev) => [response.data.comment, ...prev]);
  } else {
    console.warn("⚠️ Comment response missing, try refreshing.");
  }
      setNewComment("");
    } catch (error) {
      console.error("Post comment failed:", error);
      alert("Failed to post comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      await axios.delete(
        `http://localhost:5000/api/comments/${commentId}`,
        config
      );
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      alert("Failed to delete comment");
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  const handleEditSubmit = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:5000/api/comments/${commentId}`,
        { text: editText },
        config
      );

      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? response.data.comment : c
        )
      );
      setEditingId(null);
      setEditText("");
    } catch (error) {
      alert("Failed to update comment");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      {userInfo ? (
        <div className="flex items-start space-x-2 mb-4">
          <img
            src={
              userInfo.user.avatar || "https://www.gravatar.com/avatar/?d=mp"
            }
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              className="w-full border rounded p-2"
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              onClick={handlePostComment}
              className="bg-blue-500 text-white px-4 py-1 rounded mt-1"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Please log in to comment.</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => {
          const isOwner =
            userInfo?.user?.id === (comment.userId?._id || comment.userId);

          return (
            <div key={comment._id} className="flex items-start space-x-2">
              <img
                src={
                  comment.userId?.avatar ||
                  "https://www.gravatar.com/avatar/?d=mp"
                }
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">
                    {comment.userId?.username || "Anonymous"}
                  </span>
                  {isOwner && (
                    <div className="space-x-2 text-xs text-blue-600">
                      {editingId === comment._id ? (
                        <>
                          <button onClick={() => handleEditSubmit(comment._id)}>
                            Save
                          </button>
                          <button onClick={() => setEditingId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(comment)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(comment._id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {editingId === comment._id ? (
                  <textarea
                    className="w-full border mt-1 rounded p-1"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <p className="text-sm mt-1">{comment.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
