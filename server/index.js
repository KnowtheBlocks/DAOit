import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from Vite dev server
  credentials: true
}));
app.use(express.json());

// Ensure data directory exists
const dataDir = join(__dirname, 'data');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

// File paths
const proposalsPath = join(dataDir, 'proposals.json');
const votingProposalsPath = join(dataDir, 'votingProposals.json');

// Helper function to read JSON file
async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

// Helper function to write JSON file
async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Helper function to determine proposal status
function determineProposalStatus(startDate, endDate) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now > end) {
    return "closed";
  } else if (now >= start && now <= end) {
    return "opened";
  }
  return "pending";
}

// Helper function to calculate quadratic vote score
function calculateQuadraticScore(votes) {
  return Math.sqrt(votes);
}

// POST endpoint to create a new proposal
app.post('/api/proposals', async (req, res) => {
  try {
    const proposalData = req.body;
    
    // Read existing proposals
    const proposals = await readJsonFile(proposalsPath);
    
    // Determine initial status
    const status = determineProposalStatus(proposalData.startDate, proposalData.endDate);
    
    // Create new proposal with status
    const newProposal = {
      ...proposalData,
      status,
      timestamp: new Date().toISOString(),
      id: `proposal_${Date.now()}`
    };
    
    // Add to proposals.json
    proposals.push(newProposal);
    await writeJsonFile(proposalsPath, proposals);
    
    // Initialize voting data in votingProposals.json
    const votingProposals = await readJsonFile(votingProposalsPath);
    const votingRecord = {
      proposalId: newProposal.proposalId,
      votes: { yes: 0, no: 0, abstain: 0 },
      voters: {},
      scores: { yes: 0, no: 0, abstain: 0 },
      totalScore: 0
    };
    
    votingProposals.push(votingRecord);
    await writeJsonFile(votingProposalsPath, votingProposals);
    
    res.status(201).json({ message: 'Proposal saved successfully', proposalId: newProposal.proposalId });
  } catch (error) {
    console.error('Error saving proposal:', error);
    res.status(500).json({ error: 'Failed to save proposal' });
  }
});

// POST endpoint to generate message for signing
app.post('/api/vote/generate-message', async (req, res) => {
  try {
    const { address, proposalId } = req.body;

    if (!address || !proposalId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate a structured message for signing
    const message = JSON.stringify({
      proposalId,
      voter: address,
      action: 'vote',
      timestamp: new Date().toISOString()
    });

    res.json({ message });
  } catch (error) {
    console.error('Error generating vote message:', error);
    res.status(500).json({ error: 'Failed to generate vote message' });
  }
});

// POST endpoint to submit a vote
app.post('/api/vote', async (req, res) => {
  try {
    console.log('Received vote request:', req.body);
    const { proposalId, voterAddress, vote } = req.body;
    
    if (!proposalId || !voterAddress || !vote) {
      console.log('Missing fields:', { proposalId, voterAddress, vote });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!['yes', 'no', 'abstain'].includes(vote)) {
      console.log('Invalid vote type:', vote);
      return res.status(400).json({ error: 'Invalid vote type' });
    }
    
    // Read current voting data
    const votingProposals = await readJsonFile(votingProposalsPath);
    console.log('Current voting proposals:', votingProposals);
    
    // Find the proposal's voting record
    let votingRecord = votingProposals.find(p => p.proposalId === proposalId);
    console.log('Found voting record:', votingRecord);
    
    // If no voting record exists, create one
    if (!votingRecord) {
      console.log('Creating new voting record for proposal:', proposalId);
      votingRecord = {
        proposalId,
        votes: { yes: 0, no: 0, abstain: 0 },
        voters: {},
        scores: { yes: 0, no: 0, abstain: 0 },
        totalScore: 0
      };
      votingProposals.push(votingRecord);
    }
    
    // Check if user has already voted
    if (votingRecord.voters[voterAddress]) {
      console.log('User has already voted:', voterAddress);
      return res.status(400).json({ error: 'User has already voted' });
    }
    
    // Record the vote
    votingRecord.votes[vote]++;
    votingRecord.voters[voterAddress] = {
      vote,
      timestamp: new Date().toISOString()
    };

    // Calculate and update quadratic scores
    votingRecord.scores[vote] = calculateQuadraticScore(votingRecord.votes[vote]);
    votingRecord.totalScore = Object.values(votingRecord.scores).reduce((a, b) => a + b, 0);
    
    console.log('Updated voting record:', votingRecord);
    
    // Update the voting record in the array
    const recordIndex = votingProposals.findIndex(p => p.proposalId === proposalId);
    if (recordIndex !== -1) {
      votingProposals[recordIndex] = votingRecord;
    }
    
    // Save updated voting data
    await writeJsonFile(votingProposalsPath, votingProposals);
    console.log('Saved voting proposals:', await readJsonFile(votingProposalsPath));
    
    res.json({ 
      message: 'Vote recorded successfully',
      scores: votingRecord.scores,
      totalScore: votingRecord.totalScore,
      votingRecord // Send back the full voting record for debugging
    });
  } catch (error) {
    console.error('Error recording vote:', error);
    res.status(500).json({ 
      error: 'Failed to record vote',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// GET endpoint to fetch all proposals
app.get('/api/proposals', async (req, res) => {
  try {
    const proposals = await readJsonFile(proposalsPath);
    res.json(proposals);
  } catch (error) {
    console.error('Error reading proposals:', error);
    res.status(500).json({ error: 'Failed to fetch proposals' });
  }
});

// GET endpoint to fetch voting data for a specific proposal
app.get('/api/voting-proposals/:proposalId', async (req, res) => {
  try {
    const { proposalId } = req.params;
    const votingProposals = await readJsonFile(votingProposalsPath);
    const votingData = votingProposals.find(p => p.proposalId === proposalId) || {
      proposalId,
      votes: { yes: 0, no: 0, abstain: 0 },
      voters: {}
    };
    res.json(votingData);
  } catch (error) {
    console.error('Error reading voting data:', error);
    res.status(500).json({ error: 'Failed to fetch voting data' });
  }
});

// GET endpoint to fetch all voting data
app.get('/api/voting-proposals', async (req, res) => {
  try {
    const votingProposals = await readJsonFile(votingProposalsPath);
    res.json(votingProposals);
  } catch (error) {
    console.error('Error reading voting proposals:', error);
    res.status(500).json({ error: 'Failed to fetch voting proposals' });
  }
});

// Endpoint to update proposal statuses
app.put('/api/proposals/update-status', async (req, res) => {
  try {
    const proposals = await readJsonFile(proposalsPath);
    let updatedCount = 0;

    // Update status for each proposal
    const updatedProposals = proposals.map(proposal => {
      const newStatus = determineProposalStatus(proposal.startDate, proposal.endDate);
      if (proposal.status !== newStatus) {
        updatedCount++;
        return { ...proposal, status: newStatus };
      }
      return proposal;
    });

    // Save updated proposals
    await writeJsonFile(proposalsPath, updatedProposals);
    
    res.json({ 
      message: 'Proposal statuses updated', 
      updatedCount 
    });
  } catch (error) {
    console.error('Error updating proposal statuses:', error);
    res.status(500).json({ error: 'Failed to update proposal statuses' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 