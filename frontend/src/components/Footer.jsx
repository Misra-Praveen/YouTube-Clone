import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import VideoCallSharpIcon from '@mui/icons-material/VideoCallSharp';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const menuItemStyle = 'items-center rounded-lg hover:bg-gray-200 cursor-pointer transition';

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 md:hidden z-50">
      <div className="flex justify-around items-center h-14">
        {/* Home */}
        <Link to="/" className={menuItemStyle}>
          <HomeIcon />
        </Link>

        {/* Upload */}
        <button
          onClick={() => navigate("/upload")}
          className={menuItemStyle}
        >
          <VideoCallSharpIcon />
        </button>

        {/* Your Videos */}
        <Link to="/channel/me" className={menuItemStyle}>
          <SmartDisplayIcon />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
