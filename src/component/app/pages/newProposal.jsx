import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaMagic } from "react-icons/fa";
import { create } from "zustand";
import { useGlobalStore } from "../../../main";
import ReactMarkdown from "react-markdown";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);

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
    formState: { errors, isValid },
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
      proposalSettings: 'default'
    },
    mode: 'onChange'
  });

  // Add truncateAddress function near the top of the component
  const truncateAddress = (address) => {
    if (!address) return 'No wallet connected';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Update userAddress field and generate proposal ID when wallet address changes
  useEffect(() => {
    if (globalWalletAddress) {
      setValue('userAddress', globalWalletAddress);
      const newProposalId = generateProposalId(userId);
      console.log("Generated Proposal ID:", newProposalId);
      setValue('proposalId', newProposalId);
    }
  }, [globalWalletAddress, userId, setValue]);

  const generateProposalStructure = async () => {
    const title = getValues('proposalTitle');
    const description = getValues('description');

    // Only proceed if at least one field has content
    if (!title && !description) {
      alert('Please add a title or description first');
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Sending request to AI service with:', { title, description });
      
      const response = await fetch('https://api.craftthefuture.xyz/webhook/daoitaiproposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || '',
          description: description || '',
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI suggestions');
      }

      const data = await response.json();
      console.log('AI Service Response:', data);

      // Extract both title and structured proposal from the response
      if (data.proposal_tittle && data.structured_proposal) {
        setAiSuggestion({
          title: data.proposal_tittle,
          description: data.structured_proposal
        });
      } else {
        console.warn('Invalid response format:', data);
        alert('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      alert('Failed to get AI suggestions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Add or update the helper function to check description length
  const getDescriptionLength = (description) => {
    return description?.length || 0;
  };

  const onSubmitSuccess = async (data) => {
    console.log('🚀 onSubmitSuccess triggered');
    console.log('Starting submission process...');
    console.log('Form data received:', data);
    setSubmitStatus({ loading: true, error: null });
    
    try {
      console.log('Setting up headers...');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Token fy0I9k6HrFPbciwBx9spI1JGN2pk0mcU");
      myHeaders.append("Content-Type", "application/json");
      console.log('Headers set:', Object.fromEntries(myHeaders.entries()));

      // Map form values to Baserow fields using user_field_names=true format
      const rawData = {
        "Address": data.userAddress,
        "Proposal Id": data.proposalId,
        "Proposal Title": data.proposalTitle,
        "Description": data.description,
        "Start date": data.startDate,
        "End date": data.endDate,
        "Status": true,
        "Summary": data.description.substring(0, 100) + "...",
        "yes_count": 0,
        "no_count": 0
      };
      console.log('Prepared data for Baserow:', rawData);
      
      const raw = JSON.stringify(rawData);
      console.log('Stringified data:', raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      console.log('Request options prepared:', { ...requestOptions, headers: Object.fromEntries(myHeaders.entries()) });

      console.log('Sending request to Baserow...');
      const response = await fetch(
        "https://api.baserow.io/api/database/rows/table/403203/?user_field_names=true", 
        requestOptions
      );
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const result = await response.text();
      console.log('Response body:', result);

      if (!response.ok) {
        throw new Error(`Baserow API error: ${response.status} - ${result}`);
      }

      console.log('Submission successful, resetting form...');
      // Reset form and generate new proposal ID
      reset();
      const newProposalId = generateProposalId(userId);
      setValue('proposalId', newProposalId);
      setSubmitStatus({ loading: false, error: null });
      
      console.log('Redirecting to /app...');
      // Redirect to /app after successful submission
      window.location.href = '/app';
      
    } catch (error) {
      console.error('Detailed error information:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setSubmitStatus({ loading: false, error: error.message });
      alert('Failed to save proposal. Please try again.');
    }
  };

  // Add a separate submit handler for debugging
  const formSubmitHandler = (data) => {
    console.log('📝 Form submitted with data:', {
      userAddress: data.userAddress,
      proposalId: data.proposalId,
      proposalTitle: data.proposalTitle,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      proposalSettings: data.proposalSettings
    });
    console.log('Form validation state:', { isValid, errors });
    return onSubmitSuccess(data);
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
        <form 
          onSubmit={handleSubmit(formSubmitHandler)} 
          className="space-y-6"
        >
          {/* User Address Field */}
          <div>
            <label htmlFor="userAddress" className="block text-gray-700 font-medium mb-2">
              Connected Wallet Address
            </label>
            <div className="space-y-2">
              <input
                {...register("userAddress")}
                id="userAddress"
                type="text"
                defaultValue={truncateAddress(globalWalletAddress)}
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
              {...register("proposalId")}
              id="proposalId"
              type="text"
              disabled={true}
              className={`bg-gray-100 w-full p-3 border ${
                errors.proposalId ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
            />
            {errors.proposalId && (
              <p className="text-red-500 text-sm mt-1">{errors.proposalId.message}</p>
            )}
          </div>

          {/* Proposal Title Field */}
          <div>
            <label htmlFor="proposalTitle" className="block text-gray-700 font-medium mb-2">
              Proposal Title
            </label>
            <div className="relative">
              <input
                {...register("proposalTitle")}
                id="proposalTitle"
                type="text"
                placeholder="Write something"
                className={`bg-white w-full p-3 pr-10 border ${
                  errors.proposalTitle ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none`}
              />
            </div>
            {errors.proposalTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.proposalTitle.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="description" className="block text-gray-700 font-medium">
                Description
              </label>
              <button
                type="button"
                onClick={generateProposalStructure}
                disabled={isGenerating}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate with AI
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <textarea
                {...register("description")}
                id="description"
                placeholder="Write your proposal description or click 'Generate with AI' to get suggestions"
                rows={4}
                className={`bg-white w-full p-3 pr-10 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none`}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}

            {aiSuggestion && (
              <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h4 className="text-sm font-medium text-yellow-800">AI Suggestion</h4>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setValue('proposalTitle', aiSuggestion.title);
                        setValue('description', aiSuggestion.description);
                        setAiSuggestion(null);
                      }}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-md hover:bg-yellow-200"
                    >
                      Use Suggestion
                    </button>
                    <button
                      type="button"
                      onClick={() => setAiSuggestion(null)}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-gray-600">
                  <div className="mb-3">
                    <h5 className="font-medium text-yellow-800">Suggested Title:</h5>
                    <p>{aiSuggestion.title}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-800">Suggested Description:</h5>
                    <ReactMarkdown>{aiSuggestion.description}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
                Start Date
              </label>
              <input
                {...register("startDate")}
                id="startDate"
                type="date"
                className={`bg-white w-full p-3 border ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
                End Date
              </label>
              <input
                {...register("endDate")}
                id="endDate"
                type="date"
                className={`bg-white w-full p-3 border ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Hidden Settings Field */}
          <input type="hidden" {...register("proposalSettings")} value="default" />

          <div className="text-center space-y-4">
            {submitStatus.error && (
              <p className="text-red-500 text-sm">
                Error: {submitStatus.error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitStatus.loading || !globalWalletAddress}
              className={`w-full py-3 px-4 ${
                submitStatus.loading || !globalWalletAddress
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-[#FFE8AE] hover:bg-yellow-500 hover:text-white'
              } text-gray-800 font-medium rounded-lg transition-colors duration-200`}
              onClick={() => {
                console.log('🔘 Submit button clicked');
                console.log('Current form values:', getValues());
              }}
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
