import React from "react";
import HeroSection from "./details/hero";
import HowItWorks from "./details/works";
import FAQs from "./details/faq";
import FeatureSection from "./details/features";
import JoinCommunity from "./details/community";
function Home() {
  return (
    <div className="pb-20">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <JoinCommunity />
      <FAQs />
    </div>
  );
}

export default Home;
