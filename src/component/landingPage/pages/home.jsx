import React from "react";
import HeroSection from "./details/hero";
import HowItWorks from "./details/works";
import FAQs from "./details/faq";
import FeatureSection from "./details/features";
import JoinCommunity from "./details/community";
function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <HowItWorks />
      <span className="bg-[#777777] h-[1px] w-[570px] my-28"></span>
      <FeatureSection />
      <JoinCommunity />
      <FAQs />
    </div>
  );
}

export default Home;
