import React from "react";

function Sustainability() {
  return (
    <div className="bg-green-50 rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-green-800">
        Promotion of sustainable practices and climate awareness in education
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-2/3">
          <p className="text-green-700">
            DAOit integrates blockchain tools for tracking carbon emissions and
            trading carbon credits, supporting educational institutions in
            adopting sustainable practices. The platform educates participants
            on the environmental impact of blockchain, advocating for
            energy-efficient models like Proof of Stake (PoS).
          </p>
        </div>
        <div className="md:w-1/3 flex justify-center">
          {/* <Recycle className="h-24 w-24 text-green-600" /> */}
        </div>
      </div>
    </div>
  );
}

export default Sustainability;
