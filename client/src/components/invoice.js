import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import './styles.css'
import bg from './images/bg3.jpg'
import bg2 from './images/bg4.jpg'

export class invoice extends Component {
    
    constructor(props) {
        super(props)
        const{state}=this.props.location
        this.state = {
            user1:[],
            user2:[],
            id1:this.props.match.params.userID,
            id2:state[0],
            amount:state[1],
            utime:''
        }
    }
    componentWillMount(){
        axios.get(`/users/`+ this.state.id1)
        .then(res=>{
            const user1=res.data;
            console.log(user1);
            this.setState({
                user1
            })
        })
        axios.get(`/users/`+ this.state.id2)
        .then(res=>{
            const user2=res.data;
            console.log(user2);
            this.setState({
                user2
            })
        })
    }
    back=()=>{
        this.props.history.push('/')
    }
    render() {
        let utime=new Date(this.state.user1.updatedAt).toString()
        return (
            <div>
                <img className='front1' src={bg} height="auto" width="38%" />
                <img className='front2' src={bg2} height="auto" width="25%" />
                <div>
                <div style={{fontSize:"4rem"}}><i className="fa fa-check-circle fa-lg"></i></div>
                <br></br>
                <h3>Successful Transaction</h3><br></br>
                <h1>&#8377;{this.state.amount}</h1><hr className='line'></hr><br></br>
                <h6>TO {this.state.user2.name}</h6>
                <p><small>A/c No. {this.state.user2.account}</small> </p><br></br>
                <h6>FROM {this.state.user1.name}</h6>
                <p><small>A/c No. {this.state.user1.account}</small> </p><br></br>
                <p>On <b> {utime.substring(3,15)}</b> At <b>{utime.substring(15,25)}</b></p><br></br>
                <p><i>Current balance in your account is <b>&#8377;{this.state.user1.balance}</b></i></p><br></br>
                <button className='btn btn-primary' onClick={this.back}>Back to Home Page</button>
                </div>
            </div>
        )
    }
}

export default withRouter(invoice)
