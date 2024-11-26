const FeatureSection = () => {
  return (
    <section className="py-16 px-8">
      <div className="flex flex-col md:flex-row items-center md:space-x-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-4 text-yellow-600">
            Empowering Education Through Blockchain
          </h3>
          <p className="text-gray-600">
            DAOIt is a decentralised governance platform designed for
            educational institutions, leveraging blockchain technology to
            facilitate democratic decision-making, financial inclusion, and
            collaborative learning.
          </p>
        </div>
        <img
          src="/path-to-image.png"
          alt="Blockchain Graphic"
          className="w-2/3 md:w-1/2 mt-6 md:mt-0"
        />
      </div>
    </section>
  );
};

export default FeatureSection;
