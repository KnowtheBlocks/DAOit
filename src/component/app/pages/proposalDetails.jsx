import React from "react";

const ProposalDetails = () => {
  const votes = new Array(66).fill({
    address: "0x4cee...b541",
    choice: "Yes",
    credits: "235Credits",
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">Proposal settings</h2>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">
              UsernameUsername234
            </span>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <div className="mb-6">
            <h3 className="text-xl font-bold">
              Lorem ipsum dolor sit, orem ipsum dolor sit
            </h3>
            <p className="text-gray-500 text-sm">
              0x4cee...b541 | Created: November 4, 2024 | Voting system:
              Quadratic
            </p>
            <p className="text-sm">To: November 7, 2024</p>
            <span className="px-3 py-1 bg-gray-300 text-sm rounded-full">
              Closed
            </span>
          </div>

          <h4 className="text-lg font-bold mb-4">Summary</h4>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur. Trincidunt in pellentesque
            in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna.
          </p>
          <p className="text-gray-600 mb-4">
            Trincidunt in pellentesque in id sodales eu scelerisque diam. Dolor
            lacus accumsan nec magna. Lorem ipsum dolor sit amet consectetur.
          </p>

          <button className="text-yellow-600 hover:underline">
            More details
          </button>
        </div>

        <div className="flex flex-wrap mt-8">
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white p-6 shadow rounded-lg">
              <h4 className="text-lg font-bold mb-4">Voting results</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Yes</span>
                  <span>235Credits | 56%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[56%]"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>No</span>
                  <span>0Credits | 0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full w-0"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Abstain</span>
                  <span>102Credits | 44%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-[44%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white p-6 shadow rounded-lg">
              <h4 className="text-lg font-bold mb-4">Votes ({votes.length})</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {votes.map((vote, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>{vote.choice}</span>
                    <span className="text-gray-500">{vote.address}</span>
                    <span className="text-gray-500">{vote.credits}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;
