import React,{Component} from "react";
import bank from '../bank.png';

class AirDrop extends Component{

    constructor(){
        super();
        this.state = {
            time:{},
            seconds:20
        };
        this.timer = 0;
        this.startTimer= this.startTimer.bind(this);
        this.countDown=  this.countDown.bind(this);

    }

    componentDidMount(){
        let timeLeftVar =  this.secondsToTime(this.state.seconds);
        this.setState({time:timeLeftVar});
    }

    startTimer(){
        if(this.timer == 0 && this.state.seconds > 0){
            this.timer = setInterval(this.countDown,1000);
        }
    }

    countDown(){
        let seconds = this.state.seconds -1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds:seconds
        })

        if(seconds == 0 ){
            clearInterval(this.timer);
        }
    }

    secondsToTime(secs){
         let hours,minutes,seconds;
         hours = Math.floor(secs / (60 * 60));

         let devisor_for_minutes = Math.floor(secs %  (60 * 60));
         minutes = Math.floor(devisor_for_minutes / 60);

         let devisor_for_seconds = Math.floor(secs %  60);
         seconds = Math.ceil(devisor_for_seconds);

         let obj = {
             'h':hours,
             'm':minutes,
             's':seconds
         }
         
         return obj;
    }

    airdropReleaseTokens(){
        let stakingB = this.props.stakingBalance;

        if(stakingB >= '50000000000000000000'){
            this.startTimer();
        }
    }


    render(){
        this.airdropReleaseTokens()
        return(
            <div style={{color:'black'}}>
                { this.state.time.m}:{this.state.time.s}
                {/* {this.startTimer()} */}
            </div>
        )
    }
}

export default AirDrop;