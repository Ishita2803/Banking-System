import React, { Component } from 'react'
import axios from 'axios'
import photo from './images/photo.png'
import './styles.css'
import 'font-awesome/css/font-awesome.min.css';
import { withRouter } from 'react-router-dom';

export class viewAllusers extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users:[]
        }
    }
    componentDidUpdate(){
        axios.get(`/users/`)
        .then(res=>{
            const users=res.data
            this.setState({users})
        })
    }
    componentWillMount(){
        axios.get(`/users/`)
        .then(res=>{
            const users=res.data
            this.setState({users})
        })
    }
    handleUpdate=async(id,event)=>{
        await this.props.history.push({
            pathname: './edit/'+id,
            state:id})
    }
    handleView=async(id,event)=>{
        await this.props.history.push({
            pathname: './view/'+id,
            state:id})
    }
    
    render() {
        return (
            <div className='center row'>
                    {this.state.users.map(user=>
                        <div className='xyx col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12' key={user._id}>
                            <div className='card'>
                            <div className='card-header'>
                                <img className="pic" src={photo}></img>
                                <small className='side'><button className='btn' onClick={()=>this.handleUpdate(user._id)}><i className="fa fa-edit"></i>&nbsp;edit</button></small>
                            </div>
                            <div className='card-body'>
                                <p><b>Name</b> : {user.name}</p>
                                <p><b>Email</b> : {user.email}</p>
                                <p><b>Phone no</b>: {user.phone}</p>
                                <p><b>Balance</b> : &#8377;{user.balance}</p>
                                <p><b>Account no</b> : {user.account}</p>
                            </div>
                            <div className='card-footer card-custom'>
                                <button className='btn btn-dark' onClick={()=>this.handleView(user._id)}>View</button>
                            </div>
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

export default withRouter(viewAllusers)

