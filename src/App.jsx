import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./component/layout/header";
import Doc from "./component/pages/documentationPage";
import Footer from "./component/layout/footer";
import "./App.css";
import Works from "./component/pages/documentation/howItWorks";
import Community from "./component/pages/communityPage";

const App = () => {
  return (
    <div className="flex flex-col bg-header-pattern bg-no-repeat bg-right-top ">
      <div className="px-10">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/developers" replace />} />
            <Route path="/developers" element={<Doc />} />
            <Route path="/community" element={<Community />} />
            <Route path="/how-it-works" element={<Works />} />
          </Routes>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
};

export default App;
