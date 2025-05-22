import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CommentSection = ({ videoId }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handleComment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/comments`,
        { videoId, text },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setText("");
      fetchComments(); // refresh
    } catch (err) {
      alert("Failed to post comment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      fetchComments(); // refresh
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Comments</h3>

      {userInfo && (
        <div className="flex items-center gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded px-3 py-1"
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Post
          </button>
        </div>
      )}

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="border-b py-2 flex justify-between items-start"
        >
          <div>
            <p className="text-sm font-semibold text-blue-700">{comment.userId.username}</p>
            <p className="text-sm">{comment.text}</p>
          </div>
          {userInfo?.user?._id === comment.userId._id && (
            <button
              onClick={() => handleDelete(comment._id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
