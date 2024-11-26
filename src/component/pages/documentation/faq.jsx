import React from "react";

function Faq() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {[
          {
            question: "What is DAOit?",
            answer:
              "DAOit is a decentralized autonomous organization focused on educational governance and collaboration.",
          },
          {
            question: "How can I participate?",
            answer:
              "Connect your wallet and start creating or voting on proposals for educational improvements.",
          },
          {
            question: "What are the benefits?",
            answer:
              "Transparent decision-making, collaborative learning, and direct participation in educational governance.",
          },
        ].map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Faq;
