import React, { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    "What is all DAOit about?",
    "Who is DAOit for?",
    "Can I create a proposal on DAOit?",
    "How do I connect my wallet?",
    "What is all DAOit about?",
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-t border-gray-700 pt-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <p className="text-lg">{faq}</p>
              <span className="text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-2 text-gray-400">
                This is the answer to the question: {faq}.
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <a
          href="#"
          className="text-yellow-500 hover:text-yellow-400 text-sm font-semibold"
        >
          See more →
        </a>
      </div>
    </div>
  );
};

export default FAQs;
