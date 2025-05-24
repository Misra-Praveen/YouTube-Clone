import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`} className="block w-full">
      <div className="mb-6">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-44 object-cover rounded-lg"
        />
        <div className="mt-2">
          <h3 className="font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-sm text-gray-500">{video.channelId?.channelName}</p>
          <p className="text-sm text-gray-500">{video.views} views</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
