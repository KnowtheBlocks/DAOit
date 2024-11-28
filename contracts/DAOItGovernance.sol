// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DAOItGovernance {
    using SafeMath for uint256;

    IERC20 public governanceToken;
    address public admin;
    uint256 public proposalId;
    uint256 public votingPeriod = 3 days;
    uint256 public minTokensToPropose = 10 ether;
    
    struct Proposal {
        uint id;
        string description;
        uint256 voteCount;
        uint256 delegatedVoteCount;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
        uint256 deadline;
        address proposer;
        mapping(address => bool) voted;
        mapping(address => uint256) delegatedVotes;
        mapping(address => bool) voters;
    }
    
    struct Treasury {
        uint256 balance;
        mapping(address => bool) signatories;
        uint256 numSignatories;
    }
    
    Treasury public treasury;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public stakes;
    mapping(address => address) public delegations;

    event ProposalCreated(uint id, address proposer, string description, uint256 deadline);
    event VoteCast(address voter, uint proposalId, uint256 weight, bool support);
    event ProposalExecuted(uint proposalId, uint256 finalVoteCount);
    event TreasuryDeposit(address indexed sender, uint256 amount);
    event TreasuryWithdrawal(address indexed to, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this.");
        _;
    }

    modifier onlyTokenHolders() {
        require(governanceToken.balanceOf(msg.sender) >= minTokensToPropose, "Insufficient tokens to propose.");
        _;
    }

    modifier validProposal(uint _proposalId) {
        require(proposals[_proposalId].id == _proposalId, "Invalid proposal ID.");
        require(!proposals[_proposalId].executed, "Proposal already executed.");
        require(block.timestamp < proposals[_proposalId].deadline, "Voting period has ended.");
        _;
    }

    constructor(IERC20 _governanceToken, address[] memory _signatories) {
        admin = msg.sender;
        governanceToken = _governanceToken;
        proposalId = 1;
        
        for (uint i = 0; i < _signatories.length; i++) {
            treasury.signatories[_signatories[i]] = true;
        }
        treasury.numSignatories = _signatories.length;
    }

    // Treasury Functions
    function depositTreasury() external payable {
        require(msg.value > 0, "Must send ETH to deposit");
        treasury.balance += msg.value;
        emit TreasuryDeposit(msg.sender, msg.value);
    }

    function withdrawTreasury(address payable _to, uint256 _amount) external onlyAdmin {
        require(treasury.balance >= _amount, "Insufficient treasury funds.");
        treasury.balance -= _amount;
        _to.transfer(_amount);
        emit TreasuryWithdrawal(_to, _amount);
    }

    // Proposal Creation
    function createProposal(string memory _description) external onlyTokenHolders {
        Proposal storage newProposal = proposals[proposalId];
        newProposal.id = proposalId;
        newProposal.description = _description;
        newProposal.voteCount = 0;
        newProposal.delegatedVoteCount = 0;
        newProposal.executed = false;
        newProposal.deadline = block.timestamp + votingPeriod;
        newProposal.proposer = msg.sender;

        emit ProposalCreated(proposalId, msg.sender, _description, newProposal.deadline);
        proposalId++;
    }

    // Voting with Quadratic Weighting & Delegation
    function vote(uint _proposalId, uint256 tokens, bool support) external validProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(tokens <= governanceToken.balanceOf(msg.sender), "Insufficient token balance.");
        require(!proposal.voted[msg.sender], "Already voted.");

        uint256 voteWeight = sqrt(tokens);
        proposal.voteCount += voteWeight;
        
        if (support) {
            proposal.yesVotes += voteWeight;
        } else {
            proposal.noVotes += voteWeight;
        }

        proposal.voted[msg.sender] = true;
        emit VoteCast(msg.sender, _proposalId, voteWeight, support);
    }

    //function delegateVote(address to) external {
       // require(to != msg.sender, "Cannot delegate to self.");
       // require(!Proposal.voted[msg.sender], "Already voted directly.");

      //  delegations[msg.sender] = to;
   // }

    function castDelegatedVote(uint _proposalId) external validProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        uint256 totalDelegatedVotes = proposal.delegatedVotes[msg.sender];
        require(totalDelegatedVotes > 0, "No delegated votes.");

        proposal.delegatedVoteCount += totalDelegatedVotes;
    }

    // Quadratic Voting Weight Calculation
    function sqrt(uint x) private pure returns (uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    // Proposal Execution
    function executeProposal(uint _proposalId) external validProposal(_proposalId) onlyAdmin {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.deadline, "Voting period not over.");
        require(proposal.yesVotes > proposal.noVotes, "Proposal did not pass.");

        proposal.executed = true;
        emit ProposalExecuted(_proposalId, proposal.voteCount);
    }
}
