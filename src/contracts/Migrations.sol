pragma solidity ^0.5.0;

contract Migrations {

    address public owner;
    uint public last_completed_migration;

    constructor() public{
        owner = msg.sender; 
    }

    modifier restricted() {
        if(msg.sender == owner) _;
    }

    function setCompleted(uint completed) public restricted{

        last_completed_migration = completed;
    }

    
    function upgrade(address newAddress) public restricted{
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(last_completed_migration);
    }
}