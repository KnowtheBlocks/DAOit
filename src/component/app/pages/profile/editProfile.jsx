import React from "react";

function EditProfile() {
  return (
    <div>
      <div className="relative mb-6">
        <img
          src="/background.jpg"
          alt="Banner"
          className="w-full h-24 rounded-lg object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full border-4 border-gray-900"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
        />
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          placeholder="Bio"
          className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <button className="w-full mt-4 p-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium rounded-md">
        Save
      </button>
    </div>
  );
}

export default EditProfile;
