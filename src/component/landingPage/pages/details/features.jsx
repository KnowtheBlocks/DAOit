import { ReactSVG } from "react-svg";
import block from "../../../../assets/block.svg";

const FeatureSection = () => {
  return (
    <div className="py-16 px-8">
      <div className="flex flex-col md:flex-row items-center md:gap-5 md:space-x-8">
        <div className="text-center md:text-left max-w-2xl">
          <h3 className="text-[40px] font-bold mb-4 text-yellow-600">
            Empowering Education Through Blockchain
          </h3>
          <p className="text-gray-600 text-2xl">
            DAOIt is a decentralised governance platform designed for
            educational institutions, leveraging blockchain technology to
            facilitate democratic decision-making, financial inclusion, and
            collaborative learning. Aims to empower educators and students by
            providing them with tools for active participation, transparent
            governance, and hands-on blockchain experience.
          </p>
        </div>
        <ReactSVG src={block} />
      </div>
    </div>
  );
};

export default FeatureSection;
