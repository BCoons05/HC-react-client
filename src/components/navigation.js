import React, {Component} from 'react'

import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {

    constructor(props){
        super(props)

        // this.state={
        //     loggedInName: ""
        // }
    }

    // responseGoogle = response => {
    //     let userName = response.profileObj.name
    //     this.setState({
    //         loggedInName: userName
    //     })
    //     this.props.handleSuccessfulLogin(userName)
    // }

    handleSignOut = () => {
        this.props.handleSuccessfulLogout()
        // this.setState({
        //     loggedInName: ""
        // })
    }

    handleSignIn = () => {
        this.props.handleSuccessfulLogin()
    }
    
    render(){
        return (
            <div className="nav-wrapper">
                <div className="left-side">
                <div className="nav-link-wrapper">
                        <NavLink exact to="/" activeClassName="nav-link-active">
                            Search
                        </NavLink>
                    </div>
                    {/* <div className="nav-link-wrapper">
                        <NavLink exact to="/add-names" activeClassName="nav-link-active">
                            Add User
                        </NavLink>
                    </div> */}
                    {this.props.loggedInStatus === "LOGGED_IN" ?
                    <div className="nav-link-wrapper">
                        <NavLink to="/add-names" activeClassName="nav-link-active">
                            Add User
                        </NavLink>
                    </div>
                    : null}
                </div>

                <div className="right-side">
                    {this.props.loggedInStatus === "LOGGED_IN" ? (
                    <div>
                        {/* <h4>Welcome, {this.props.userName}</h4> */}
                        <NavLink to="/" activeClassName="nav-link-active" onClick={() => this.handleSignOut()}>
                            Simulate Sign Out
                        </NavLink>
                    </div>
                    )
                    : 
                    <div>
                        <a onClick={() => this.handleSignIn()}>
                            Simulate Sign In
                        </a>
                    </div>   
                    }
                </div>
            </div>
        )
    }
}

