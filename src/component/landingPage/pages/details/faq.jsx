import React, { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is all DAOit about?",
      answer: "Looking to learn more about Doait? No worries, get access to the best resource available on order to get educated and become part of the community. "
    },
    {
      question: "Who is DAOit for?",
      answer: "Looking to learn more about Doait? No worries, get access to the best resource available on order to get educated and become part of the community. "
    },
    {
      question: "Can I create a proposal on DAOit?",
      answer: "Looking to learn more about Doait? No worries, get access to the best resource available on order to get educated and become part of the community. "
    },
    {
      question: "How do I connect my wallet?",
      answer: "Looking to learn more about Doait? No worries, get access to the best resource available on order to get educated and become part of the community. "
    },
    {
      question: "What is all DAOit about?",
      answer: "Looking to learn more about Doait? No worries, get access to the best resource available on order to get educated and become part of the community. "
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full flex justify-center bg-[url('/LandingPage/FaqBg.svg')] bg-fixed bg-cover bg-center py-24">
      <div className="px-10 max-w-screen-2xl w-full flex flex-col items-center bg-transparent">
        <h2 className="text-[40px] font-bold mb-6">Frequently Asked Question</h2>
        <div className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="pt-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <p className="text-[22px] font-medium w-[850px]">{faq.question}</p>
                <span className="text-xl">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-2 text-[#777777] border-l-[7px] py-3 px-7 border-[#F8B51C] text-lg w-[850px]">
                  {faq.answer}.
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
    </section>
  );
};

export default FAQs;
