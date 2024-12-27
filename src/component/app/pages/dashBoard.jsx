import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { PiNotePencilFill } from "react-icons/pi";

const calculatePercentage = (value, otherValue) => {
  const total = (value || 0) + (otherValue || 0);
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBaserowData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Token fy0I9k6HrFPbciwBx9spI1JGN2pk0mcU");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch("https://api.baserow.io/api/database/rows/table/403203/?user_field_names=true", requestOptions);
        const result = await response.json();
        
        // Transform Baserow rows into proposal format using the actual field names
        const transformedProposals = result.results.map(row => {
          const now = new Date();
          const startDate = new Date(row['Start date']);
          const endDate = new Date(row['End date']);
          
          // Determine status based on current date in relation to start and end dates
          let status;
          if (now < startDate) {
            status = 'upcoming';
          } else if (now > endDate) {
            status = 'closed';
          } else {
            status = 'opened';
          }

          return {
            id: row.id,
            proposalId: row['Proposal Id'],
            title: row['Proposal Title'],
            description: row['Description'],
            avatar: "https://via.placeholder.com/32",
            username: row['Address'],
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: status,
            summary: row['Summary'],
            votes: {
              yes: row['yes_count'] || 0,
              no: row['no_count'] || 0,
              abstain: 0,
            }
          };
        });

        // Filter out any invalid or incomplete proposals
        const validProposals = transformedProposals.filter(proposal => 
          proposal.title && 
          proposal.description && 
          proposal.title !== 'string' && // Filter out placeholder data
          proposal.description !== 'string'
        );

        setItems(validProposals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Baserow data:', error);
        setError('Failed to load proposals');
        setLoading(false);
      }
    };

    fetchBaserowData();
  }, []);

  // Replace the JSON.stringify display with a proper card layout
  const renderProposals = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(proposal => (
        <div 
          key={proposal.id} 
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/app/proposal/${proposal.proposalId}`)}
        >
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={proposal.avatar} 
              alt="User avatar" 
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600 truncate">
              {proposal.username}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {proposal.summary || proposal.description}
          </p>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center gap-2">
                <span className="text-green-600">Yes: {proposal.votes.yes || 0}</span>
                <span className="text-red-600">No: {proposal.votes.no || 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">
                  {calculatePercentage(proposal.votes.yes, proposal.votes.no)}%
                </span>
                <span className="text-red-600">
                  {calculatePercentage(proposal.votes.no, proposal.votes.yes)}%
                </span>
              </div>
            </div>
            
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ 
                  width: `${calculatePercentage(proposal.votes.yes, proposal.votes.no)}%`
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              {new Date(proposal.endDate).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded ${
              proposal.status === 'opened' 
                ? 'bg-green-100 text-green-800'
                : proposal.status === 'upcoming'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {proposal.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 p-6 flex gap-20">
      <div className="pt-14">
        <button
          className="p-2 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          <LuSettings2 />
        </button>
        <div
          onClick={() => navigate("/app/new-proposal")}
          className="mt-10 p-2 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          <PiNotePencilFill />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-4 justify-end mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none bg-white"
          />
          <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-md">
            500 credits
          </button>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          renderProposals()
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
