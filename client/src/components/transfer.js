import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import './styles.css'

export class transfer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users:[],
            balance1:0,
            balance2:0,
            amount:0,
            user2:'',
            load: false
        }
    }
    componentDidMount(){
        axios.get(`/users`)
        .then(res=>{
            const users=res.data
            this.setState({users})
        })
        axios.get(`/users/`+ this.props.match.params.userID)
        .then(res=>{
            const users=res.data;
            this.setState({
                balance1:parseInt(users.balance)
            })
        })
    }
    getOne(userID){
        axios.get(`/users/`+ userID)
        .then(res=>{
            const users=res.data;
            this.setState({
                balance2:parseInt(users.balance),
                user2:users._id
            })
        })
    }
    onClick=async(userID)=>{
        const bal=this.getOne(userID)
        console.log(this.state);
    }

    handleOnClick = (event)=>{
        this.setState({
            amount:parseInt(event.target.value)
        })
    }
    handleSubmit=async(event)=>{
        event.preventDefault()
        if (this.state.user2===''){
            alert('Please select a user')
        }
        else{
            await this.setState({
                balance1:parseInt(this.state.balance1)-parseInt(this.state.amount),
                balance2:parseInt(this.state.balance2)+parseInt(this.state.amount),
            })
            await axios.put(`/user/`+ this.props.match.params.userID,
            {
                balance:this.state.balance1,
            }).then(
                await axios.put(`/user/`+ this.state.user2,
                {
                    balance:this.state.balance2,
                })
            ).then(
                await this.props.history.push({
                    pathname: '/invoice/'+this.props.match.params.userID,
                    state:[this.state.user2,this.state.amount]})
            )
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <h4><b>Select the account to transfer money</b></h4>
                <form className="original" onSubmit={this.handleSubmit}>
                    <table className="table table-bordered table-striped tablew" >
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Account Number</th>
                            <th scope="col">Name</th>
                            </tr>
                        </thead>
                    <tbody>
                {this.state.users.filter(user=> user._id !== this.props.match.params.userID).map(user=>
                <tr key={user._id}> 
                    <th scope="row"><input className='form-check-input' name="name" onChange={()=>this.onClick(user._id)} value={user._id} type="radio" id={user._id}/></th>
                    <td>{user.account}</td>
                    <td>{user.name}</td>
                </tr>                       
                    )}
                    </tbody>
                    </table>
                    <div className="input-group tablew">
                    <label ><th>Enter the amount</th>   </label>&nbsp;&nbsp;&nbsp;
                    <input className='form-control' type="number" name='amount' value={this.state.amount} onChange={this.handleOnClick} min="1" max={this.state.balance1} required/></div>
                    <div><button className='btn btn-success' id="id" type='submit'>Transfer </button></div>
                </form>
            </div>
        )
    }
}

export default withRouter(transfer)
