import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import photo from './images/photo.png'
import './styles.css'
import bg from './images/bg5.jpg'

export class viewOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId:this.props.match.params.userID,
            users:[]
        }
    }
    componentWillMount(){
        axios.get(`/users/`+ this.props.match.params.userID)
        .then(res=>{
            const users=res.data;
            console.log(users);
            this.setState({
                users
            })
        })
    }
    handleTransfer=async(id,event)=>{
        this.props.history.push({
            pathname: '/transfer/'+id,
            state:id})
    }
    render() {
        const time=new Date(this.state.users.createdAt).toString();
        const utime=new Date(this.state.users.updatedAt).toString();
        let message;
        if(time!==utime){
            message=<p>Last updated on <b>{utime.substring(3,15)}</b> at <b>{utime.substring(15,25)}</b></p>
        }
        else{
            message=<p></p>
        }
        return (
            <div >
                <br></br>
                <div className='center'>
                <div className='div-align'>
                <img className="picture" src={photo} ></img><br/><br/>
                <p><b>Account no.</b> : {this.state.users.account}</p>
                <p><b>Name </b>: {this.state.users.name}</p>
                <p><b>Email</b> : {this.state.users.email}</p>
                <p><b>Password</b> : {this.state.users.password}</p>
                <p><b>Phone no.</b> : {this.state.users.phone}</p>
                <p><b>Balance</b> : &#8377;{this.state.users.balance}</p>
                <p>Created on <b>{time.substring(3,15)}</b> at <b>{time.substring(15,25)}</b></p>
                {message}
                </div>
                </div>
                <br></br>
                <button className='btn btn-success' onClick={()=>this.handleTransfer(this.state.userId)} style={{marginRight:"3%"}}>Transfer money</button>
                <img className='front3' src={bg} height="60%" width="auto"/>
            </div>
        )
    }
}

export default withRouter(viewOne)
