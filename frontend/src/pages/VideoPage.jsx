import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection";

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  
  const[otherVideos, setOtherVideos] = useState([]);
  // fetch videos for right side of video page
  const fetchOtherVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos");
      const filtered = res.data.filter((v) => v._id !== id);
      setOtherVideos(filtered);
    } catch (err) {
      console.error("Failed to load other videos", err);
    }
  };

  // fetch video
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
      setVideo(res.data);

      // Initialize local like/dislike state
      const likes = res.data.likes || [];
      const dislikes = res.data.dislikes || [];

      setLikesCount(likes.length);
      setDislikesCount(dislikes.length);

      // Optional: if your backend stores user ID in likes/dislikes
      if (userInfo?.user?._id) {
        setUserLiked(likes.includes(userInfo.user._id));
        setUserDisliked(dislikes.includes(userInfo.user._id));
      }
    } catch (err) {
      console.error("Failed to load video", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchOtherVideos();
  }, [id]);

  const handleLike = () => {
    if (userLiked) {
      setLikesCount(likesCount - 1);
      setUserLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setUserLiked(true);

      if (userDisliked) {
        setDislikesCount(dislikesCount - 1);
        setUserDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setDislikesCount(dislikesCount - 1);
      setUserDisliked(false);
    } else {
      setDislikesCount(dislikesCount + 1);
      setUserDisliked(true);

      if (userLiked) {
        setLikesCount(likesCount - 1);
        setUserLiked(false);
      }
    }
  };

  // hanndel youtube video url
  const isYouTubeLink = (url) =>
    url?.includes("youtube.com/watch?v=") || url?.includes("youtu.be/");
// embed youtube url
  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!video) return <p className="text-center mt-10">Video not found.</p>;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 p-4">
      <div className="w-full lg:w-2/3">
        {/* Video Player */}
        <div className="aspect-video bg-black mb-4">
          {isYouTubeLink(video.videoUrl) ? (
            <iframe
              src={getYouTubeEmbedUrl(video.videoUrl)}
              title={video.title}
              className="w-full h-full rounded"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={video.videoUrl}
              controls
              className="w-full h-full object-contain rounded"
            />
          )}
        </div>

        <h2 className="text-xl font-semibold">{video.title}</h2>
        <p className="text-gray-600 text-sm">{video.views} views</p>
        <div className="mt-2 text-gray-700">{video.description}</div>
        <div className="mt-4 text-blue-700 font-bold">
          {video.channelId?.channelName}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleLike}
            className={`px-3 py-1 rounded font-medium ${
              userLiked ? "bg-green-200" : "bg-gray-100"
            }`}
          >
            👍 {likesCount}
          </button>
          <button
            onClick={handleDislike}
            className={`px-3 py-1 rounded font-medium ${
              userDisliked ? "bg-red-200" : "bg-gray-100"
            }`}
          >
            👎 {dislikesCount}
          </button>
        </div>
        {/* Comment section */}
        <CommentSection videoId={video._id} />
      </div>
      {/* Right side of video page  */}
      <div className="w-full lg:w-1/3">
        <h3 className="text-lg font-semibold mb-2">More Videos</h3>
        <div className="space-y-4">
          {otherVideos.map((vid) => (
            <Link to={`/video/${vid._id}`}
              key={vid._id}
              className="flex gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              
            >
              <div className="w-[60%] lg:w-[50%]">
                {vid.thumbnailUrl ? (
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-20 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-20 bg-gray-200 rounded" />
                )}
              </div>
              <div className="w-[40%] lg:w-[50%">
                <h4 className="text-sm font-medium line-clamp-2">
                  {vid.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {vid.channelId?.channelName || "Unknown Channel"}
                </p>
                <p className="text-xs text-gray-400">{vid.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
