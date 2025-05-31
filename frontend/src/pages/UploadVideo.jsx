import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [channels, setChannels] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: "",
    videoUrl: "",
    channelId: "",
  });

  const navigate = useNavigate();

  // fetch channel
  const fetchMyChannels = async () => {
    try {
      const res = await axios.get(
        "https://youtube-clone-backend.onrender.com/channels/my-channels",
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      if (res.data.length === 0) {
        // Redirect if no channels
        alert("You need to create a channel before uploading a video.");
        navigate("/channel/me");
        return; 
      }

      setChannels(res.data);
      if (res.data.length > 0) {
        setForm((prev) => ({ ...prev, channelId: res.data[0]._id }));
      }
    } catch (err) {
      console.error("Failed to load channels", err);
    }
  };

  // if user is not login then go to login first after then fetch channel
  useEffect(() => {
    //fetchMyChannels();
    if (userInfo?.token) {
      fetchMyChannels();
    } else {
      navigate("/login");
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // upload video
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, thumbnailUrl, videoUrl, channelId, category } = form;

    if (!title || !description || !thumbnailUrl || !videoUrl || !channelId || !category) {
      return alert("All fields are required.");
    }

    try {
      const res = await axios.post("https://youtube-clone-backend.onrender.com/videos", form, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      alert("Video uploaded successfully!");
      navigate("/channel/me");
    } catch (err) {
      console.error(err);
      alert("Failed to upload video");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={form.title}
          onChange={handleChange}
          className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200 h-24"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL (image)"
          value={form.thumbnailUrl}
          onChange={handleChange}
          className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
          required
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL (.mp4 or YouTube embed)"
          value={form.videoUrl}
          onChange={handleChange}
          className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
          required
        />

        <select
          name="channelId"
          value={form.channelId}
          onChange={handleChange}
          className="w-full shadow shadow-gray-600 px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200"
        >
          {channels.map((ch) => (
            <option key={ch._id} value={ch._id}>
              {ch.channelName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
