import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet, useLocation } from "react-router-dom";
import profile from "../../../assets/profile.png";

function Layout() {
  const location = useLocation();

  const shouldShowHeader = location.pathname !== "/app/profile";
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto w-[1200px]">
        {shouldShowHeader && (
          <Header user="username.....5678" profile={profile} />
        )}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
