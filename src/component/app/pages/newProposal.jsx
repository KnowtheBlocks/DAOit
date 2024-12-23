import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../utilies/modal";
import { TiTickOutline } from "react-icons/ti";

const proposalSchema = z.object({
  proposalTitle: z
    .string()
    .nonempty("Proposal title is required")
    .min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  extraDescription: z.string().optional(),
  proposalSettings: z.string().nonempty("Please select a proposal setting"),
});

const NewProposal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(proposalSchema),
  });
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    setActiveModal("success");
  };

  const closeModal = () => setActiveModal(null);
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="flex gap-2 items-center mb-6">
          <div
            className="p-2 h-fit border border-gray-300 rounded-full shadow-md hover:bg-gray-200"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack size={25} />
          </div>
          <h1 className="text-2xl font-semibold text-yellow-500 ">
            New Proposal
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Proposal title
            </label>
            <input
              type="text"
              placeholder="Write something"
              {...register("proposalTitle")}
              className={`bg-white w-full p-3 border ${
                errors.proposalTitle
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              } rounded-lg focus:outline-none`}
            />
            {errors.proposalTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.proposalTitle.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Write something"
              rows={4}
              {...register("description")}
              className={`bg-white w-full p-3 border ${
                errors.description
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              } rounded-lg focus:outline-none`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              placeholder="Write something"
              rows={4}
              {...register("extraDescription")}
              className="bg-white w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-200"
            ></textarea>
          </div>
        </form>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Proposal settings
            </label>
            <select
              {...register("proposalSettings")}
              className={`bg-white w-full p-3 border ${
                errors.proposalSettings
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              } rounded-lg focus:outline-none`}
            >
              <option value="Voting system">Voting system</option>
              <option value="Quadratic">Quadratic</option>
            </select>
            {errors.proposalSettings && (
              <p className="text-red-500 text-sm mt-1">
                {errors.proposalSettings.message}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <h2 className="text-gray-700 font-medium mb-4">Timeline</h2>
            <p className="text-gray-600 text-sm">
              <p>Start</p>
            </p>
            From - <strong>November 4, 2024.</strong>
            <p className="text-gray-600 text-sm">
              <p>End</p>{" "}
              <p>
                To - <strong> November 7, 2024.</strong>
              </p>
            </p>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-200 text-gray-800 font-medium rounded-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-white transition-colors duration-300"
            >
              Continue
            </button>
            <Modal
              isOpen={activeModal === "success"}
              onClose={closeModal}
              title="Proposal posted successfully "
              color="bg-black"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="p-2 h-fit border rounded-full shadow-md bg-[#60CF0B]">
                  <TiTickOutline />
                </div>

                <Link to="/app">
                  <button className="flex bg-gradient-to-r from-[#F8B51C] to-[#FEE539] text-white  items-center justify-center w-[350px] px-4 py-2 bg-[#494445] my-1 rounded-lg">
                    <span className="flex gap-2 items-center">View</span>
                  </button>
                </Link>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposal;
