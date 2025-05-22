import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <Header toggleSidebar={toggleSidebar} setSearchTerm={setSearchTerm} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto ml-0">
          {/* Pass searchTerm to Home page only */}
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  );
};

export default App;