import  { useState } from "react";
import Header from "../layout/header";
import HomeCard from "../../utilies/homeCard";
import Modal from "../../utilies/modal";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import coin from "../../../assets/coinbase.svg";
import meta from "../../../assets/metamask.svg";
import Phantom from "../../../assets/phantom.svg";

function DashboardHome() {
  const cardContents = [
    "Lorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna. SeLorem ipsum dolor sit ametel pellentesque elit urna in id.",
    "Lorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna. SeLorem ipsum dolor sit ametel pellentesque elit urna in id.",
    "Lorem ipsum dolor sit amet consectetur. Tincidunt in pellentesque in id sodales eu scelerisque diam. Dolor lacus accumsan nec magna. SeLorem ipsum dolor sit ametel pellentesque elit urna in id.",
  ];
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center text-center mt-[15%] px-4">
        <h4 className="text-yellow-500 font-semibold">Get Started</h4>
        <h1 className="text-2xl md:text-4xl font-semibold mt-2 text-gray-800 leading-relaxed">
          Take power to shape your school’s future. Join the <br />
          teacher-student-led movement for future-ready learning
        </h1>
        <div className="mt-7">
          <button
            onClick={() => setActiveModal("wallet")}
            className="px-4 py-2 bg-black text-white rounded-md "
          >
            Connect Wallet
          </button>
          <Modal
            isOpen={activeModal === "wallet"}
            onClose={closeModal}
            title="Choose a wallet"
          >
            <div className="flex flex-col justify-center items-center">
              <Link to="/app">
                <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
                  <span className="flex gap-2 items-center">
                    <ReactSVG src={coin} />
                    Coinbase
                  </span>
                </button>
              </Link>
              <Link to="/app">
                <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
                  <span className="flex gap-2 items-center">
                    <ReactSVG src={meta} /> Metamask
                  </span>
                </button>
              </Link>
              <Link to="/app">
                <button className="flex items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
                  <span className="flex gap-2 items-center">
                    <ReactSVG src={Phantom} /> Phantom
                  </span>
                </button>
              </Link>
            </div>
          </Modal>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12 px-4">
        {cardContents.map((content, index) => (
          <HomeCard key={index}>
            <p className="text-sm leading-relaxed">{content}</p>
          </HomeCard>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
