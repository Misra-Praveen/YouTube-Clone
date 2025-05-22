import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChannelPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyChannel = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/channels/my-channels",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setChannel(res.data[0]); // assuming user has 1 channel
    } catch (err) {
      console.error("Failed to fetch channel", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      fetchMyChannel(); // refresh
    } catch (err) {
      alert("Failed to delete video");
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      fetchMyChannel();
    } else {
      navigate("/login");
    }
  }, [userInfo]);
  console.log(channel);

  if (loading) return <p className="text-center mt-10">Loading channel...</p>;
  if (!channel) return <p className="text-center mt-10">No channel found.</p>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{channel.channelName}</h1>
        <p className="text-gray-600">{channel.description}</p>
        <img
          src={channel.channelBanner || "https://via.placeholder.com/800x150"}
          alt="Channel Banner"
          className="w-full h-40 object-cover rounded mt-2"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {channel.videos.map((video) => (
          <div key={video._id} className="bg-white w-[320px] shadow rounded p-2">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-36 object-cover rounded"
            />
            <h3 className="font-bold mt-2">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.views} views</p>
            <div className="flex justify-between mt-2">
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => navigate(`/video/${video._id}`)}
              >
                Watch
              </button>
              <button
                className="text-red-600 hover:underline text-sm"
                onClick={() => handleDeleteVideo(video._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
