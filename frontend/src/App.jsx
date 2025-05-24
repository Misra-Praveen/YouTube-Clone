import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev); //setSidebarOpen(!sidebarOpen);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/video/")) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <Header toggleSidebar={toggleSidebar} setSearchTerm={setSearchTerm} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {/* <Sidebar isOpen={sidebarOpen} /> */}
        {sidebarOpen && <Sidebar isOpen={sidebarOpen} />}

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto ml-0">
          {/* Pass searchTerm to Home page only */}
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
      <div className="mb-0 -mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default App;
