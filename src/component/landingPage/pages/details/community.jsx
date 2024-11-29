import React from "react";

const JoinCommunity = () => {
  return (
    <div className="bg-white/50 rounded-lg shadow-lg backdrop-blur-sm border border-white/30 pt-12 pb-40 px-8 text-center max-w-5xl mx-auto my-20">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Join the Community
      </h2>
      <p className="text-gray-600 mt-4">
        Learn more about DAOit, join us on Discord and X app to chat with the
        team and community.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
          Join us on Discord
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
          Join us on X
        </button>
      </div>
    </div>
  );
};

export default JoinCommunity;
