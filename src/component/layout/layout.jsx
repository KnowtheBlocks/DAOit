import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
