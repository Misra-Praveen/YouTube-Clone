import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentSection from "../components/CommentSection";

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error("Failed to load video", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!video) return <p className="text-center mt-10">Video not found.</p>;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/3">
        <div className="aspect-video bg-black mb-4">
          <video
            src={video.videoUrl}
            controls
            className="w-full h-full object-contain"
          />
          {/* <iframe
          width="100%"
          height="500px"
          src={`${video.videoUrl}?autoplay=1`}  // Ensure autoplay is enabled
          title={video.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        /> */}
        </div>

        <h2 className="text-xl font-semibold">{video.title}</h2>
        <p className="text-gray-600 text-sm">{video.views} views</p>
        <div className="mt-2 text-gray-700">{video.description}</div>
        <div className="mt-4 text-blue-700 font-bold">
          {video.channelId?.channelName}
        </div>

        <CommentSection videoId={video._id} />
      </div>

      {/* You can add recommendations / related videos on the right */}
    </div>
  );
};

export default VideoPage;
