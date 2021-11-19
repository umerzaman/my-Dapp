 
const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should();

contract('DecentralBank',([owner,customer])=>{
    // All of code realted testing 

    let tether,rwd,decentralBank;

    function tokens(number){

        return web3.utils.toWei(number,'ether')
    }

    before(
        async()=>{
            tether = await Tether.new();
            rwd = await RWD.new();
            decentralBank = await DecentralBank.new(rwd.address,tether.address);

            //Transer token to DC Bank
            await rwd.transfer(decentralBank.address,tokens('1000000'))

            // Transer 100 mock Tether to customer
            await tether.transfer(customer,tokens('100'),{from:owner})
        }
    )

    describe('Mock Tether Deployment',async () =>{
        it('it matach name successfully',async ()=>{ 
            const name = await tether.name();
            assert.equal(name,'Mock Tether Token');
        });
    });

    describe('RWD name success',async () =>{
        it('it matach name successfully',async ()=>{ 
            const name = await rwd.name();
            assert.equal(name,'Reward Token');
        });
    });

    describe('Decentral Bank Deployment',async () =>{
        
        it('it matach name successfully',async ()=>{ 
            const name = await decentralBank.name();
            assert.equal(name,'Decentral Bank');
        });

        it('contract has token',async ()=>{ 
            const balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance,tokens('100000')); 
        });
        describe('Yeild Farming', async ()=>{
            it('rewards tokens for staking',async() =>{
            let result;
       
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(),tokens('100'),'cutomer mock wallet balance before staking')
             
    
              //Check Staking  For Customer OF 100 tokens
              await tether.approve(decentralBank.address,tokens('100'),{from:customer});
              await decentralBank.depositTokens(tokens('100'),{from:customer});

              // Check updated balance of customer
              result = await tether.balanceOf(customer);
              assert.equal(result.toString(),tokens('0'),'cutomer mock wallet balance after staking 100 tokens')

              // Check updated balance of Decentral Bank
              result = await tether.balanceOf(decentralBank.address);
              assert.equal(result.toString(),tokens('100'),'decentral bank mock wallet balance after staking customer')


              // Is Staking Balance
              result = await decentralBank.isStaking(customer);
              assert.equal(result.toString(),'true','cutomer is staking status after staking')

             }); 
    });  
    }); 
});