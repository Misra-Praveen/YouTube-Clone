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

const Header = ({ toggleSidebar, setSearchTerm }) => {
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.token;
  const username = userInfo?.user?.username;
  const avatar = userInfo?.user?.avatar;

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Submit local search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input.trim());
    setInput("");
  };

  // Close dropdown if clicked outside
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
      {/* Left: Logo & Sidebar */}
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

      {/* Center: Search */}
      <form onSubmit={handleSearch} className="w-1/2 sm:mt-0">
        <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[80%] md:w-[85%] lg:w-[88%] px-4 py-1 border border-gray-200 rounded-l-full focus:outline-none"
          />
          <button
            type="submit"
            className="w-[20%] md:w-[15%] lg:w-[12%] flex items-center justify-center bg-gray-50 hover:bg-gray-100"
          >
            <SearchSharpIcon />
          </button>
        </div>
      </form>

      {/* Right: User / Auth */}
      <div className="flex items-center gap-2 sm:mt-0">
        {token ? (
          <div className="flex items-center gap-2">
            <button
              className="hidden md:block p-2 rounded-full hover:bg-gray-100"
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
            className="flex items-center gap-2 px-2.5 py-[5px] border border-gray-300 rounded-full hover:bg-gray-100"
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