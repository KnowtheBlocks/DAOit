import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function LandingLayout() {
  return (
    <div className="flex flex-col bg-header-pattern bg-no-repeat bg-right-top ">
      <div className="">
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingLayout;
