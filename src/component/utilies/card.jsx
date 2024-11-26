import React from "react";
import { ReactSVG } from "react-svg";

const Card = ({ title, description, svgSrc }) => {
  return (
    <div className="max-w-xs  rounded-lg shadow-md">
      <div className="rounded-t-lg w-full h-52 bg-gray-200 flex justify-center items-center overflow-hidden">
        <ReactSVG src={svgSrc} className="w-auto h-full max-w-full" />
      </div>
      <div className="px-4 py-10 bg-[#494445] text-white rounded-b-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm  mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
