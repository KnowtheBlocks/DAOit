import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../utilies/modal";
import { TiTickOutline } from "react-icons/ti";
import { FaMagic } from "react-icons/fa";

// Updated Zod schema with new fields
const proposalSchema = z.object({
  userAddress: z.string().nonempty("User address is required"),
  proposalId: z.string().nonempty("Proposal ID is required"),
  proposalTitle: z
    .string()
    .nonempty("Proposal title is required")
    .min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
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
          {/* User Address Field */}
          <div>
            <label htmlFor="userAddress" className="block text-gray-700 font-medium mb-2">
              User Address
            </label>
            <input
              id="userAddress"
              type="text"
              {...register("userAddress")}
              className={`bg-white w-full p-3 border ${
                errors.userAddress
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              } rounded-lg focus:outline-none`}
            />
            {errors.userAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userAddress.message}
              </p>
            )}
          </div>

          {/* Proposal ID Field */}
          <div>
            <label htmlFor="proposalId" className="block text-gray-700 font-medium mb-2">
              Proposal ID
            </label>
            <input
              id="proposalId"
              type="text"
              {...register("proposalId")}
              className={`bg-white w-full p-3 border ${
                errors.proposalId
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              } rounded-lg focus:outline-none`}
            />
            {errors.proposalId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.proposalId.message}
              </p>
            )}
          </div>

          {/* Proposal Title Field */}
          <div>
            <label htmlFor="proposalTitle" className="block text-gray-700 font-medium mb-2">
              Proposal Title
            </label>
            <div className="relative">
              <input
                id="proposalTitle"
                type="text"
                placeholder="Write something"
                {...register("proposalTitle")}
                className={`bg-white w-full p-3 pr-10 border ${
                  errors.proposalTitle
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-yellow-200"
                } rounded-lg focus:outline-none`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                onClick={() => console.log('AI Magic for title')}
              >
                <FaMagic className="w-4 h-4" />
              </button>
            </div>
            {errors.proposalTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.proposalTitle.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <div className="relative">
              <textarea
                id="description"
                placeholder="Write something"
                rows={4}
                {...register("description")}
                className={`bg-white w-full p-3 pr-10 border ${
                  errors.description
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-yellow-200"
                } rounded-lg focus:outline-none`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-yellow-500"
                onClick={() => console.log('AI Magic for description')}
              >
                <FaMagic className="w-4 h-4" />
              </button>
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                {...register("startDate")}
                className={`bg-white w-full p-3 border ${
                  errors.startDate
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-yellow-200"
                } rounded-lg focus:outline-none`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                {...register("endDate")}
                className={`bg-white w-full p-3 border ${
                  errors.endDate
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-yellow-200"
                } rounded-lg focus:outline-none`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-200 text-gray-800 font-medium rounded-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-white transition-colors duration-300"
            >
              Submit Proposal
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
        </form>
      </div>
    </div>
  );
};

export default NewProposal;
