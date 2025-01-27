import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Community from "./component/landingPage/pages/communityPage";
import Doc from "./component/landingPage/pages/documentationPage";
import Works from "./component/landingPage/pages/howItWorks";
import LandingLayout from "./component/landingPage/layout/layout";
import Layout from "./component/app/layout/layout";
import Home from "./component/landingPage/pages/home";
import DashboardPage from "./component/app/pages/AllProposal";
import ProposalPage from "./component/app/pages/proposal";
import NewProposal from "./component/app/pages/newProposal";

import DashboardHome from "./component/app/pages/home";
import "./App.css";
import ProfileCard from "./component/app/pages/profile";
import ActivityList from "./component/app/pages/profile/activity";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Routes>
      {/* Landing Page Layout */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Home />} />
            <Route path="developers" element={<Doc />} />
            <Route path="community" element={<Community />} />
            <Route path="how-it-works" element={<Works />} />
          </Route>

          {/* Dashboard Home */}
      <Route path="/home" element={<DashboardHome />} />

      {/* Dashboard App Layout */}
      <Route path="/app" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="proposal/:id" element={<ProposalPage />} />
            <Route path="profile" element={<ProfileCard />} />
        <Route path="activity-profile" element={<ActivityList />} />
        <Route path="new-proposal" element={<NewProposal />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
