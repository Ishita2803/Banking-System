import React, { Component } from 'react'
import logo from './images/logo.png'

export class nav extends Component {
    render() {
        return (
            <div>
                <div className='navbar navbar-dark bg-dark'>
                <h4 className='head'><img src={logo} height="45" />&nbsp;&nbsp;<a style={{color:"white"}} href='/'>Banking System</a></h4>
                </div>
            </div>
        )
    }
}

export default nav
