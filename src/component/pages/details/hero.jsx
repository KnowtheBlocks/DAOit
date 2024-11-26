const Hero = () => {
  return (
    <section className="text-center py-16 bg-gradient-to-b from-yellow-50 to-white">
      <h2 className="text-4xl font-bold mb-4">
        Building a Collaborative Learning Community
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
        Join our Educational Decentralized Autonomous Organization (DAO) to
        Learn, Collaborate, and Grow. Empowering students, educators, and
        administrators in a transparent decision-making process.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
          Launch App
        </button>
        <button className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg shadow hover:bg-yellow-100">
          Explore Proposal
        </button>
      </div>
    </section>
  );
};

export default Hero;
