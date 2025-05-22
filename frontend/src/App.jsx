import React, {useState} from 'react'
import Header from './components/Header'
import Sidebar from "./components/Sidebar"
import { Outlet } from "react-router-dom";



const App = () => {
const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  console.log("Sidebar is open?", sidebarOpen);

  return (
    
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main content area */}
        <main className="flex-1 p-4 overflow-y-auto ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App