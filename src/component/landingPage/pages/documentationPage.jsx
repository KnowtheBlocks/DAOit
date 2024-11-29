import React from "react";
import Sidebar from "../layout/sidebar";

function Doc() {
  return (
    <div className="flex flex-1 overflow-hidden text-sm px-10">
      <Sidebar />
      <div className="flex-1  pt-8 pr-64 pl-10  text-justify py-24  ">
        <h1 className="text-[40px] font-bold  ">DAOit Documentation</h1>
        <p className="mt-4 max-w-4xl">
          DAOit is a decentralized platform for education. Empowering
          communities through blockchain technology, fostering transparency, and
          enabling collaborative learning.
        </p>
        <div className="mt-8 max-w-4xl">
          <h2 className="text-lg font-semibold ">Overview</h2>
          <p className="mt-2">
            DAOIt is a decentralised governance platform designed for
            educational institutions, leveraging blockchain technology to
            facilitate democratic decision-making, financial inclusion, and
            collaborative learning. It aims to empower educators and students by
            providing them with tools for active participation, transparent
            governance, and hands-on blockchain experience. DAOIt aligns with
            global educational goals, particularly SDG 4.7, by promoting peace,
            inclusivity, and sustainability. It also serves as an evidence of
            collaboration in the education ecosystem.
          </p>
          <div className="pt-2 mb-[-8px]">
            <p className="font-medium ">Key Feature of DAOit includes:</p>
            <ul className="mt-4 list-disc pl-6">
              <li>Smart contracts for proposals, voting, and execution.</li>
              <li>Blockchain-based governance to enhance inclusivity.</li>
              <li>Transparent and auditable decision-making processes.</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 max-w-4xl">
          <h2 className="text-lg font-semibold ">Mission and Values</h2>
          <p className="mt-2">
            The mission of DAOit includes inclusivity, financial literacy,
            sustainability practice, peace advocacy, collaboration and
            participation of students, teachers and educators in decision making
            process which ensure the following:
          </p>
          <h3 className="mt-4 font-medium ">Educator</h3>
          <ul className="mt-2 list-disc pl-6">
            <li>
              To propose new learning modules and vote on curriculum changes so
              that I can ensure the course content remains relevant to student
              needs.
            </li>
            <li>
              To collaborate with other teachers and students in a decentralised
              manner, so I can foster a more inclusive and transparent
              educational environment.
            </li>
          </ul>
          <h3 className="mt-4 font-medium ">Student</h3>
          <ul className="mt-2 list-disc pl-6">
            <li>
              To vote on school policies and learning methods, so I can have a
              say in the decisions that affect my learning experience.
            </li>
            <li>
              To learn about DeFi and blockchain, so I can develop relevant
              skills and participate in the global digital economy.
            </li>
          </ul>
          <h3 className="mt-4 font-medium ">Administrator</h3>
          <ul className="mt-2 list-disc pl-6 ">
            <li>
              To track carbon emissions and implement sustainable practices, so
              I can ensure that my institution meets its environmental goals.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Doc;
