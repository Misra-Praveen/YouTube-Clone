import React from 'react';
import { Link } from 'react-router-dom';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <WarningAmberOutlinedIcon sx={{ fontSize: 40 }} className="text-yellow-500 mb-4 animate-bounce" />

      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition active:scale-95"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
