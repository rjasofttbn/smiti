import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

// Import external CSS
import "../../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-layout">
      {sidebarOpen && <Sidebar sidebarOpen={sidebarOpen} />}
      <div className="main-content">
        <Topbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="page-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
}