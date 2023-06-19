// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Lottery {
    address public owner;
    address payable public marketing;  
    address payable[] public players;
    address[] public winners;
    uint public lotteryId;
    uint public marketingTaxPercentage = 5; 

    constructor(address payable _marketing) {
        owner = msg.sender;
        marketing = _marketing;
        lotteryId = 0;
    }

    function getWinners() public view returns (address[] memory){
        return winners;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(msg.value >= .01 ether);

        
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function getLotteryId() public view returns(uint) {
        return lotteryId;
    }


     function pickWinner() public onlyOwner {
        uint randomIndex = getRandomNumber() % players.length;

       
        uint marketingTax = (address(this).balance * marketingTaxPercentage) / 100;
        marketing.transfer(marketingTax);

        
        uint winnerAmount = address(this).balance;  
        players[randomIndex].transfer(winnerAmount);
        
        winners.push(players[randomIndex]);
        lotteryId++;

        
        players = new address payable[](0);
    }

    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }
}
