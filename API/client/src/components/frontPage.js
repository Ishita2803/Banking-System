import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import './styles.css'
import bg from './images/bg1.jpg'

export class frontPage extends Component {

    handleClick=async(event)=>{
        this.props.history.push('./viewAll');
    }
    

    render() {
        return (
            <div className='background'>
                <img className='front' src={bg} height="90%" width="auto"/>
                <div className='head-side'> 
                <h1>Sparks</h1>
                <h1>Foundation</h1>
                </div>
                <button className='btn btn-dark button-side' onClick={()=>this.handleClick()}>  View all Users</button>
            </div>
        )
    }
}

export default withRouter(frontPage)
