import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";

const Header = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.token;
  const username = userInfo?.user?.username;
  const avatar = userInfo?.user?.avatar;

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed top-0 bg-white shadow-md z-50 px-4 py-2 flex items-center justify-between flex-wrap">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-0.5 md:gap-4">
        <button
          className="hidden sm:block p-2 rounded-full hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <MenuRoundedIcon fontSize="large" />
        </button>
        <div className="flex items-center gap-1">
          <YouTubeIcon sx={{ color: "red", fontSize: 38 }} />
          <span className="hidden sm:inline text-xl font-semibold">YouTube</span>
          <sup className="hidden sm:inline text-gray-500 text-sm">CLONE</sup>
        </div>
      </div>

      {/* Center: Search Bar */}
      <form onSubmit={handleSearch} className="w-1/2">
        <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-[80%] px-4 py-1 border rounded-l-full focus:outline-none"
          />
          <button className="w-[20%] flex items-center justify-center bg-gray-50 hover:bg-gray-100">
            <SearchSharpIcon />
          </button>
        </div>
      </form>

      {/* Right: User/Sign In */}
      <div className="flex items-center gap-2">
        {token ? (
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => navigate("/upload")}
            >
              <VideoCallSharpIcon fontSize="large" />
            </button>
            <div ref={dropdownRef} className="relative">
              <img
                src={
                  avatar?.startsWith("http")
                    ? avatar
                    : "https://www.gravatar.com/avatar/?d=mp"
                }
                alt="avatar"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md py-2 z-50">
                  <div className="px-4 py-2 font-bold text-blue-700 border-b border-gray-200">
                    {username}
                  </div>
                  <Link
                    to="/channel/me"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                  >
                    🎬 Your Channel
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogoutIcon fontSize="small" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            <AccountCircleIcon />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;