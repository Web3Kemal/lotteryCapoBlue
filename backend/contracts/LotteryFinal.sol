// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Lottery {
    address public owner;
    address payable public marketing;  
    address payable[] public players;
    address[] public winners;
    uint public lotteryId;
    uint public marketingTaxPercentage = 5; 
    uint public maxPlayers = 20; 
    IERC20 public token;

    uint256 public ENTRY_FEE = 100000 * 10**18; // Consider the decimal places of the token

    constructor(address payable _marketing, address _tokenAddress) {
        owner = msg.sender;
        marketing = _marketing;
        lotteryId = 0;
        token = IERC20(_tokenAddress);
    }

    function getWinners() public view returns (address[] memory){
        return winners;
    }

    function getBalance() public view returns (uint) {
        return token.balanceOf(address(this));
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public {
        require(players.length < maxPlayers, "Max players limit reached");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= ENTRY_FEE, "Check the token allowance");

        token.transferFrom(msg.sender, address(this), ENTRY_FEE);
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function getLotteryId() public view returns(uint) {
        return lotteryId;
    }

    function pickWinner() public onlyOwner {
        require(players.length > 0, "No players in the lottery");
        uint randomIndex = getRandomNumber() % players.length;
        
        uint marketingTax = (getBalance() * marketingTaxPercentage) / 100;
        token.transfer(marketing, marketingTax);

        uint winnerAmount = getBalance();
        token.transfer(players[randomIndex], winnerAmount);
        
        winners.push(players[randomIndex]);
        lotteryId++;

        players = new address payable[](0);
    }

    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }
}
