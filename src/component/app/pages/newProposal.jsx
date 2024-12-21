import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaMagic } from "react-icons/fa";
import { create } from "zustand";
import { useGlobalStore } from "../../../main";
import { signMessage } from "thirdweb/utils";

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

// Access the global wallet store
const useWalletStore = create((set) => ({
  walletAddress: null,
  setWalletAddress: (address) => set({ walletAddress: address }),
}));

const NewProposal = () => {
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });
  const walletAddress = useWalletStore((state) => state.walletAddress);
  const { walletAddress: globalWalletAddress, userId } = useGlobalStore();
  const [globalVariablesReady, setGlobalVariablesReady] = useState(false);

  // Generate proposal ID based on user ID and timestamp
  const generateProposalId = (userId) => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    const randomStr = Math.random().toString(36).substring(2, 5);
    return `prop_${userId ? userId.slice(-4) : 'anon'}_${timestamp}_${randomStr}`;
  };

  // Poll for global variables until they are available
  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (globalWalletAddress && userId) {
        console.log("🌍 Global Wallet Address:", globalWalletAddress);
        console.log("🆔 Global User ID:", userId);
        setGlobalVariablesReady(true);
        clearInterval(pollInterval);
      } else {
        console.log("Waiting for global variables...");
      }
    }, 1000); // Poll every second

    // Cleanup interval on component unmount
    return () => clearInterval(pollInterval);
  }, [globalWalletAddress, userId]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue
  } = useForm({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      userAddress: walletAddress || '',
      proposalId: '',
      proposalTitle: '',
      description: '',
      startDate: '',
      endDate: '',
      proposalSettings: ''
    }
  });

  // Update userAddress field and generate proposal ID when wallet address changes
  useEffect(() => {
    if (globalWalletAddress) {
      setValue('userAddress', globalWalletAddress);
      const newProposalId = generateProposalId(userId);
      console.log("Generated Proposal ID:", newProposalId);
      setValue('proposalId', newProposalId);
    }
  }, [globalWalletAddress, userId, setValue]);

  const onSubmitSuccess = async (data) => {
    setSubmitStatus({ loading: true, error: null });
    
    try {
      // Sign message before submitting proposal
      const message = `I am submitting a proposal with ID: ${data.proposalId}`;
      
      try {
        await signMessage({
          message,
          privateKey: globalWalletAddress // Using wallet address as key
        });
      } catch (signError) {
        throw new Error('Failed to sign proposal message');
      }

      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save proposal');
      }

      console.log('Form submitted and saved successfully!');
      console.log('Form data:', data);
      
      reset();
      // Generate new proposal ID after successful submission
      const newProposalId = generateProposalId(userId);
      setValue('proposalId', newProposalId);
      setSubmitStatus({ loading: false, error: null });
      
      alert('Proposal submitted successfully!');
      
    } catch (error) {
      console.error('Error saving proposal:', error);
      setSubmitStatus({ loading: false, error: error.message });
      alert('Failed to save proposal. Please try again.');
    }
  };

  // Test button handler that sends data to server
  const testFormValues = async () => {
    const currentValues = getValues();
    console.log('Current form values:', currentValues);
    
    try {
      // Sign test message
      const message = `Testing proposal with values: ${JSON.stringify(currentValues)}`;
      
      try {
        await signMessage({
          message,
          privateKey: globalWalletAddress
        });
      } catch (signError) {
        throw new Error('Failed to sign test message');
      }

      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentValues,
          isTest: true // Flag to indicate test data
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send test data');
      }

      const result = await response.json();
      console.log('Test data sent successfully:', result);
      alert('Test data sent to server successfully!');
      
    } catch (error) {
      console.error('Error sending test data:', error);
      alert('Failed to send test data to server');
    }
  };

  if (!globalVariablesReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-yellow-500 mb-6">
          New Proposal
        </h1>
        <form onSubmit={handleSubmit(onSubmitSuccess)} className="space-y-6">
          {/* User Address Field */}
          <div>
            <label htmlFor="userAddress" className="block text-gray-700 font-medium mb-2">
              Connected Wallet Address
            </label>
            <div className="space-y-2">
              <input
                id="userAddress"
                type="text"
                value={globalWalletAddress || 'No wallet connected'}
                disabled={true}
                className="bg-gray-100 w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-gray-600"
              />
              {userId && (
                <div className="text-sm text-gray-600">
                  User ID: {userId}
                </div>
              )}
            </div>
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
              disabled={true}
              className={`bg-gray-100 w-full p-3 border ${
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

          <div className="text-center space-y-4">
            {submitStatus.error && (
              <p className="text-red-500 text-sm">
                Error: {submitStatus.error}
              </p>
            )}
            
            <button
              type="button"
              onClick={testFormValues}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Test Form Values
            </button>

            <button
              type="submit"
              disabled={submitStatus.loading || !globalWalletAddress}
              className={`w-full py-3 px-4 ${
                submitStatus.loading || !globalWalletAddress
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-[#FFE8AE] hover:bg-yellow-500 hover:text-white'
              } text-gray-800 font-medium rounded-lg transition-colors duration-200`}
            >
              {submitStatus.loading ? 'Submitting...' : !globalWalletAddress ? 'Connect Wallet to Submit' : 'Submit Proposal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProposal;
