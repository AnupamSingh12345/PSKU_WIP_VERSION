import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Naviagtion extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/FirstPage">Go</NavLink>
            </div>)
    }
}

export default Naviagtion;