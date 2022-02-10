// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Donations {
    
    address public owner;
    uint256 public totalDonations;
    mapping(address => uint256) donators;
    address[] public addresses;
    constructor() 
    {
        owner=msg.sender;
    }
    function donate() external payable
    {
        if (donators[msg.sender]==0){
        addresses.push(msg.sender);
        }
        require(msg.value > 0, "zero donate");
       
        totalDonations+= msg.value;
        donators[msg.sender]+=msg.value;
        
    }

   
    function withdraw(address payable to, uint256 amount) external payable
    {
        require(msg.sender==owner,"Not owner");
        require(totalDonations >= amount ,"not enough money");
        to.transfer(amount);
        totalDonations-=amount;
    }
    function donationBalance(address x) external view returns (uint256)
    {
        return donators[x];
    }
    function donatorsList() external view returns (address[] memory)
    {
        return addresses;
    }

}