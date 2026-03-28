import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../styles/dashboard.css";

export default function DashboardLayout({ lang, setLang }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} lang={lang} />

      {/* Main content */}
      <div
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? 0 : 0, // DO NOT add extra margin when sidebar is open
        }}
      >
        <Topbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} lang={lang} />

        <div className="page-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}