import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HistoryIcon from '@mui/icons-material/History';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DownloadIcon from '@mui/icons-material/Download';


const Sidebar = ({isOpen}) => {

     const menuItemStyle = 'flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition';

  return (
    <aside className={`bg-white p-4 w-65 ${isOpen ? "block" : "hidden"}  fixed md:static h-full z-40`}>
        {/* Primary Navigation */}
      <div className='space-y-1 mb-4'>
        <div className={menuItemStyle}>
          <HomeIcon />
          <span>Home</span>
        </div>
        <div className={menuItemStyle}>
          <VideoLibraryRoundedIcon />
          <span>Shorts</span>
        </div>
        <div className={menuItemStyle}>
          <SubscriptionsRoundedIcon />
          <span>Subscriptions</span>
        </div>
        <div className={menuItemStyle}>
          <PlayCircleOutlineOutlinedIcon />
          <span>YouTube Music</span>
        </div>
      </div>

      <hr className='my-2 shadow shadow-gray-700 border-white' />

      {/* You Section */}
      <div className='space-y-1 mb-4'>
        <div className='flex items-center px-2 py-2 gap-2'>
          <span className='font-semibold text-[18px]'>You</span>
          <ArrowForwardIosIcon sx={{width:"16px"}} />
        </div>
        <div className={menuItemStyle}>
          <HistoryIcon />
          <span>History</span>
        </div>
        <div className={menuItemStyle}>
          <PlaylistPlayIcon />
          <span>Playlists</span>
        </div>
        <div className={menuItemStyle}>
          <SmartDisplayIcon />
          <span>Your videos</span>
        </div>
        <div className={menuItemStyle}>
          <WatchLaterIcon />
          <span>Watch later</span>
        </div>
        <div className={menuItemStyle}>
          <ThumbUpOffAltIcon />
          <span>Liked videos</span>
        </div>
        <div className={menuItemStyle}>
          <DownloadIcon />
          <span>Downloads</span>
        </div>
      </div>

      <hr className='my-2 shadow shadow-gray-700 border-white' />

      {/* Subscriptions */}
      <div className={menuItemStyle}>
        {/* <SubscriptionsRoundedIcon /> */}
        <span className='font-semibold'>Subscriptions</span>
      </div>
    </aside >
  )
}

export default Sidebar