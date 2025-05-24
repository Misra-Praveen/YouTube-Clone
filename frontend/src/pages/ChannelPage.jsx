import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChannelPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
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
      setChannel(res.data[0]);
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

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/channels",
        { channelName, description, channelBanner },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setChannel(res.data.channel);
      navigate("/upload");
    } catch (err) {
      alert("Failed to create channel");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      fetchMyChannel();
    } else {
      navigate("/login");
    }
  }, [userInfo]);

  if (loading) return <p className="text-center mt-10">Loading channel...</p>;

  // if channel not found then create first
  if (!channel) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Create Your Channel</h2>
        <form onSubmit={handleCreateChannel}>
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200 mb-3"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200 mb-3"
          />
          <input
            type="text"
            placeholder="Channel Banner URL (optional)"
            value={channelBanner}
            onChange={(e) => setChannelBanner(e.target.value)}
            className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200 mb-3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Channel
          </button>
        </form>
      </div>
    );
  }

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
