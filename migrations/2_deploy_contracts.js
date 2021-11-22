const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');


module.exports =async function deployer(deployer,network,accounts) {
   //Deploye Mock Tether Contract
   await deployer.deploy(Tether); 
   const tether = await Tether.deployed();
   //Deploye RWD Contract
   await deployer.deploy(RWD); 
   const rwd = await RWD.deployed();

   //Deploye Decentral Bank Contract
   await deployer.deploy(DecentralBank,rwd.address,tether.address); 
   const decentralbank = await DecentralBank.deployed();

   // Transfer all RWD to DecentralBank
   await rwd.transfer(decentralbank.address,'1000000000000000000000000');

   // Distribute 100 tether token to investor
   await tether.transfer(accounts[1],'1000000000000000000')
}; 