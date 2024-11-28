// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DAOItOracle.sol";
import "./DAOItToken.sol";

contract DAOItGovernance {
    DAOItOracle public oracle;
    DAOItToken public token;

    struct Proposal {
        uint id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 voteCount;
        bool executed;
        uint256 deadline;
        address proposer;
        uint256 gasPriceThreshold; // Added for gas price constraint
        mapping(address => bool) voted;
        mapping(address => uint256) delegatedVotes;
    }

    uint256 public proposalId;
    uint256 public votingPeriod = 3 days;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => address) public delegations;

    event ProposalCreated(uint256 indexed proposalId, string description, address proposer, uint256 deadline);
    event VoteCast(address indexed voter, uint256 proposalId, uint256 weight, bool support);
    event ProposalExecuted(uint256 indexed proposalId, uint256 finalVoteCount);

    constructor(address _oracle, address _token) {
        oracle = DAOItOracle(_oracle);
        token = DAOItToken(_token);
        proposalId = 1;
    }

    // Create a proposal, including current gas price threshold from the oracle
    function createProposal(string memory _description) external {
        uint256 gasPriceThreshold = oracle.gasPriceThreshold();

        Proposal storage newProposal = proposals[proposalId];
        newProposal.id = proposalId;
        newProposal.description = _description;
        newProposal.voteCount = 0;
        newProposal.executed = false;
        newProposal.deadline = block.timestamp + votingPeriod;
        newProposal.proposer = msg.sender;
        newProposal.gasPriceThreshold = gasPriceThreshold;

        emit ProposalCreated(proposalId, _description, msg.sender, newProposal.deadline);
        proposalId++;
    }

    // Vote on a proposal, implementing quadratic voting based on token balance
    function vote(uint256 _proposalId, uint256 tokenAmount, bool support) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp < proposal.deadline, "Voting period has ended");
        require(!proposal.voted[msg.sender], "Already voted");
        require(tokenAmount <= token.balanceOf(msg.sender), "Insufficient token balance");

        uint256 voteWeight = sqrt(tokenAmount); // Quadratic voting weight
        proposal.voted[msg.sender] = true;
        proposal.voteCount += voteWeight;

        if (support) {
            proposal.votesFor += voteWeight;
        } else {
            proposal.votesAgainst += voteWeight;
        }

        emit VoteCast(msg.sender, _proposalId, voteWeight, support);
    }

    // Delegate votes to another voter
    function delegate(address to) external {
        require(to != msg.sender, "Cannot delegate to yourself");
        delegations[msg.sender] = to;
    }

    // Execute a proposal if it meets conditions, including gas price constraint
    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.deadline, "Voting period not over");
        require(!proposal.executed, "Proposal already executed");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal did not pass");

        // Check gas price threshold before execution
        uint256 currentGasPrice = oracle.gasPriceThreshold();
        require(currentGasPrice <= proposal.gasPriceThreshold, "Gas price threshold not met");

        proposal.executed = true;

        emit ProposalExecuted(_proposalId, proposal.voteCount);
    }

    // Utility function to compute square root for quadratic voting
    function sqrt(uint256 x) private pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
