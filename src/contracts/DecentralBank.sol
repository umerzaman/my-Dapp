 pragma solidity ^0.5.0;
 import './RWD.sol';
 import './Tether.sol';


contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address [] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;



    constructor(RWD _rwd,Tether _tether) public{
        rwd = _rwd;
        tether=_tether;
    }  

    function depositTokens(uint _amount) public{
        //require staking amount to be greater than Zero
        require(_amount > 0, 'amount cannot be 0');

        //Transer tether token to this contract address for staking
        tether.TransferFrom(msg.sender, address(this), _amount);

        // Update Staking Balance 
        stakingBalance[msg.sender] =  stakingBalance[msg.sender] + _amount; 

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        
        //Update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}