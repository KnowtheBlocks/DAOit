import React, { useState } from "react";
import Modal from "../../utilies/modal";

const ProposalPage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-yellow-600">
            Proposal settings
          </h2>
        </div>

        <div className="border-gray-300 border flex justify-between p-4 rounded-lg  mb-6">
          <div>
            <div className=" space-x-2">
              <p className="text-[20px] font-medium">
                Lorem ipsum dolor sit, orem ipsum dolor sit
              </p>
              <div className="flex items-center pt-1 gap-2">
                <p className="text-sm">0x4cee...b541</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <div className="flex gap-4">
                <p>
                  <span className="font-semibold">November 4, 2024</span>
                </p>
                <p>
                  Voting system -
                  <span className="font-semibold">Quadratic</span>
                </p>
              </div>{" "}
              <div className="flex gap-4">
                <p>
                  From - <span className="font-semibold">November 4, 2024</span>
                </p>
                <p>
                  To - <span className="font-semibold">November 7, 2024</span>
                </p>{" "}
              </div>
            </div>
          </div>
          <div>
            <button className="border-green-500 border text-green-700 py-1 px-4 rounded-lg">
              Opened
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg text-yellow-600 font-medium mb-2">Summary</h2>
          <p className="text-gray-700 border border-gray-300 rounded-lg p-5">
            Lorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque in
            id sodales eu scelerisque diam. Dolor lacus accumsan nec magna.
            SeLorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque
            in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna.
            Se Lorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque
            in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna.
            SeLorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque
            in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna.
            Se
          </p>
        </div>

        <div>
          <h2 className="text-lg text-yellow-600 font-medium mb-2">
            More details
          </h2>
          <div className="text-gray-700 p-5 space-y-4 border border-gray-300">
            <p>
              Lorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque
              in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna.
              SeLorem ipsum dolor sit amet consectetur. Tincidunt in
              pellentesque in id sodales eu scelerisque diam. Dolor lacus
              accumsan nec magna. Se Lorem ipsum dolor sit amet consectetur.
              Tincidunt in pellentesque in id sodales eu scelerisque diam. Dolor
              lacus accumsan nec magna. SeLorem ipsum dolor sit amet
              consectetur. Tincidunt in pellentesque in id sodales eu
              scelerisque diam. Dolor lacus accumsan nec magna. Se{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3  p-6  ">
        <div className="border  p-4 rounded-lg flex flex-col items-center ">
          <div className="flex justify-between items-center pb-4 ">
            <div className="space-x-4">
              <button
                onClick={() => openModal("yes")}
                className="text-sm border-[#60CF0B] hover:bg-[#4EA20E] text-green-700 py-1 px-4 rounded-full"
              >
                Yes
              </button>
              <button
                onClick={() => openModal("no")}
                className="text-sm hover:bg-orange-700 border-[#E27525] text-red-700 py-1 px-4 rounded-full"
              >
                No
              </button>
              <button
                onClick={() => openModal("abstain")}
                className="text-sm hover:bg-orange-600 border-[#E27525] text-orange-700 py-1 px-4 rounded-full"
              >
                Abstain
              </button>
            </div>
          </div>
          <div>
            <button className="w-full text-white bg-yellow-600 py-1 px-32 rounded-lg">
              Vote
            </button>
          </div>
        </div>

        {/* <div className="mb-6">
          <h2 className="text-lg font-medium">Current results</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Yes</span>
                <span>56%</span>
              </div>
              <div className="h-2 bg-green-500 rounded"></div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>No</span>
                <span>56%</span>
              </div>
              <div className="h-2 bg-red-500 rounded"></div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Abstain</span>
                <span>56%</span>
              </div>
              <div className="h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div> */}

        <div>
          <h2 className="text-lg font-medium mb-4">Votes (66)</h2>
          <ul className="space-y-2">
            {[...Array(10)].map((_, index) => (
              <li
                key={index}
                className="flex justify-between text-sm bg-gray-100 p-2 rounded"
              >
                <span>0x4cee...b541</span>
                <span className="font-medium text-gray-600">235 Credits</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "yes"}
        onClose={closeModal}
        title="Confirm Votes"
        color="bg-black text-white"
      >
        <div className="flex flex-col items-center gap-5">
          <p className="w-[50px] text-sm bg-[#60CF0B] hover:bg-[#4EA20E] text-green-700 py-1 px-4 rounded-full">
            Yes
          </p>
          Voting power - Q253 credits
          <div>
            <button className="bg-yellow-600 text-white px-4 py-2">
              Continue
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "no"}
        onClose={closeModal}
        title="Confirm Votes"
        color="bg-black text-white"
      >
        <div className="">
          <div className="text-sm bg-[#E27525] hover:bg-[#D0601F] text-red-700 py-1 px-4 rounded-full">
            No
          </div>
          Voting power - Q150 credits
          <button className="bg-yellow-600 text-white">Continue</button>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "abstain"}
        onClose={closeModal}
        title="Confirm Votes"
        color="bg-black text-white"
      >
        <div className="">
          <div className="text-sm bg-[#E2A65C] hover:bg-[#D59D4A] text-orange-700 py-1 px-4 rounded-full">
            Abstain
          </div>
          Voting power - Q100 credits
          <button className="bg-yellow-600 text-white">Continue</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProposalPage;
