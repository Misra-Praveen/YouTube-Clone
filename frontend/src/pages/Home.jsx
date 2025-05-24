import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const { searchTerm, setSearchTerm } = useOutletContext();
  const [category, setCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Education", "Gaming", "Music", "News", "Vlogs"];

  // fetch all video
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // fetch filter video by title, description, channelName and by category
  useEffect(() => {
    const term = searchTerm?.toLowerCase() || "";
    let filtered = [...videos];

    if (term.length > 0) {
      filtered = filtered.filter((video) => {
        const titleMatch = video.title?.toLowerCase().includes(term);
        const descMatch = video.description?.toLowerCase().includes(term);
        const channelMatch = video.channelId?.channelName?.toLowerCase().includes(term);
        return titleMatch || descMatch || channelMatch;
      });
    }

    if (category !== "All") {
      filtered = filtered.filter(
        (video) => video.category?.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredVideos(filtered);
  }, [videos, searchTerm, category]);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setSearchTerm("")
  };

  return (
    <div className="p-4 ">
      {/* Category Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto mb-6 whitespace-nowrap hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-1 rounded-full border ${
              category === cat ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid or Messages */}
      {loading ? (
        <p className="text-center text-lg">Loading videos...</p>
      ) : filteredVideos.length === 0 ? (
        <p className="text-center text-lg text-red-500">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
