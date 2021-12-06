import React,{Component} from "react";
import tether from '../tether.png'
import AirDrop from "./AirDrop";

class Main extends Component {


    render(){
        console.log(this.props.tetherBalance)
        return(
          <div id='content' className='mt-3'>
              <table className='table text-muted text-center'>
                  <thead>
                      <tr style={{color:'black '}}>
                          <th scope='col'>Staking Balance</th>
                          <th scope='col'>Reward Balance</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{window.web3.utils.fromWei(this.props.stakingBalance,'Ether')} USDT</td>
                          <td>{window.web3.utils.fromWei(this.props.rwdBalance,'Ether')} RWD</td>
                      </tr>
                  </tbody>
              </table>
              <div className='card mt-2' style={{opacity:'.9'}}>
                  <form className='mb-3'
                  onSubmit={(event)=>{
                      event.preventDefault();
                      let amount =window.web3.utils.toWei(this.input.value.toString(),'Ether');
                      this.props.stakeTokens(amount);
                  }}
                  >
                      <div style={{borderSpace:'0 1em'}}>
                          <label className='float-left' style={{marginLeft:'15px'}}> <b>Stake Tokens</b></label>
                                <span className='float-right' style={{marginRight:'8px'}}>Balance: {window.web3.utils.fromWei(this.props.tetherBalance,'Ether')}</span>
                      </div>


                      <div className='input-group mb-4'>
                        <input type='text' ref={(input)=>{this.input = input}} required placeholder='0' />
                        <div className='input-group-open'>
                        <div className='input-group-text'>
                            <img alt='tether' height='32' src={tether} alt='tether'/>
                            &nbsp;&nbsp;&nbsp;USDT
                        </div>
                        </div>
                    
                    
                      </div>
                      <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                  </form>
                  <button type='submit' onClick={(event)=>{
                        event.preventDefault();
                        this.props.unstakeTokens();
                  }} className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>  
                  
                  <div className='card-body text-center' style={{color:'blue'}}>
                    AIRDROP <AirDrop statkingBalance={this.props.stakingBalance}/>
                  </div>
                  </div>
          </div>
        );
    }
}

export default Main;