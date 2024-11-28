// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOItOracle is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;

    uint256 public gasPriceThreshold;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    event DataRequestSent(bytes32 indexed requestId);
    event GasPriceUpdated(uint256 gasPrice);

    constructor(address _oracle, string memory _jobId, uint256 _fee, address _link) {
        setChainlinkToken(_link);
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
    }

    // Request current gas price to determine execution feasibility
    function requestGasPriceData() public onlyOwner {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", "https://api.etherscan.io/api?module=gastracker&action=gasoracle");
        request.add("path", "result.ProposeGasPrice");

        bytes32 requestId = sendChainlinkRequestTo(oracle, request, fee);
        emit DataRequestSent(requestId);
    }

    // Callback function to update gas price threshold
    function fulfill(bytes32 _requestId, uint256 _gasPrice) public recordChainlinkFulfillment(_requestId) {
        gasPriceThreshold = _gasPrice;
        emit GasPriceUpdated(_gasPrice);
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory temp = bytes(source);
        if (temp.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
