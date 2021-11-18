const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');


module.exports =async function deployer(deployer) {
   //Deploye Mock Tether Contract
   await deployer.deploy(Tether); 
   //Deploye RWD Contract
   await deployer.deploy(RWD); 
   //Deploye Decentral Bank Contract
   await deployer.deploy(DecentralBank); 
}; 