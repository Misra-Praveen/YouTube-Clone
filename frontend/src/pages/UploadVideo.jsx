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

  const fetchMyChannels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/channels/my-channels", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setChannels(res.data);
      if (res.data.length > 0) {
        setForm((prev) => ({ ...prev, channelId: res.data[0]._id }));
      }
    } catch (err) {
      console.error("Failed to load channels", err);
    }
  };

  useEffect(() => {
    fetchMyChannels();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, thumbnailUrl, videoUrl, channelId } = form;

    if (!title || !description || !thumbnailUrl || !videoUrl || !channelId) {
      return alert("All fields are required.");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/videos", form, {
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
          className="input w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="input w-full h-24"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (optional)"
          value={form.category}
          onChange={handleChange}
          className="input w-full"
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL (image)"
          value={form.thumbnailUrl}
          onChange={handleChange}
          className="input w-full"
          required
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL (.mp4 or YouTube embed)"
          value={form.videoUrl}
          onChange={handleChange}
          className="input w-full"
          required
        />

        <select
          name="channelId"
          value={form.channelId}
          onChange={handleChange}
          className="input w-full"
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
