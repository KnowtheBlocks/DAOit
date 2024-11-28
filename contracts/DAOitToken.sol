// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOItToken is ERC20, Ownable {
    constructor() ERC20("DAOItToken", "DAOIT") {
        _mint(msg.sender, 1_000_000 * 10**decimals()); // Initial supply of 1,000,000 tokens
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
