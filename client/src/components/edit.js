import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import bg from './images/bg0.jpg'

export class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId:this.props.match.params.userID,
            name:'',
            email:'',
            phone:'',
            password:'',
            balance:'',
            account:'',
            createdAt:'',
        }
    }
    componentWillMount(){
        axios.get(`/users/`+ this.props.match.params.userID)
        .then(res=>{
            const users=res.data;
            console.log(users);
            this.setState({
                name:users.name,
                email:users.email,
                phone:users.phone,
                password:users.password,
                balance:users.balance,
                account:users.account,
                createdAt:users.createdAt
            })
        })
    }
    handleOnClick=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit=async(event)=>{
        event.preventDefault()
        await axios.put(`/users/`+ this.props.match.params.userID,
        {
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            password:this.state.password,
            balance:this.state.balance,
        })
        .then(await (this.props.history.push('/viewAll')))
    }

    render() {
        const time=this.state.createdAt;
        return (
            <div>
            <div className='form-align'>
                <br></br>
                <p>Your bank account with account no. {this.state.account} was created on {String(time).split("T",1)} at {String(time).substring(11,20)} </p>
                <br></br>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <label >Name : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className='input-group-text bg-transparent '><i class="fa fa-user fa-lg"></i></span>
                        <input type="text" name='name' className='form-control abc' value={this.state.name} onChange={this.handleOnClick} required/>
                    </div>
                    <div className="input-group">
                        <label>Email : </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className='input-group-text bg-transparent '><i class="fa fa-envelope fa-lg"></i></span>
                        <input className='form-control abc' type="text" name='email' value={this.state.email} onChange={this.handleOnClick} required/>
                    </div>
                    <div className="input-group">
                        <label >Phone no. :</label>
                        <span className='input-group-text bg-transparent '><i class="fa fa-phone fa-lg"></i></span>
                        <input className='form-control abc' type="text" name='phone' value={this.state.phone} onChange={this.handleOnClick} size="10" maxlength="10" minlength="10" required/>
                    </div>
                    <div className="input-group">
                        <label > Password : </label>&nbsp;
                        <span className='input-group-text bg-transparent '><i class="fa fa-lock fa-lg"></i></span>
                        <input className='form-control abc' type="text" name='password' value={this.state.password} onChange={this.handleOnClick} required/>
                    </div>
                    <div className="input-group">
                        <label >Balance : </label>&nbsp;&nbsp;&nbsp;
                        <span className='input-group-text bg-transparent '><i class="fa fa-money fa-lg"></i></span>
                        <input className='form-control abc' type="text" name='balance' value={this.state.balance} onChange={this.handleOnClick} required/>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-dark button-align '>Edit</button>
                    </div>
                </form>
                </div>
                <img className='front0' src={bg} height="80%" width="auto"/>
            </div>
        )
    }
}

export default withRouter(edit)