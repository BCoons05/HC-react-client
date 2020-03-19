import React, { Component } from "react";
// import GoogleLogin from 'react-google-login';
import axios from 'axios'
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import NavBar from "./navigation"
import SearchForm from "./search-form"
import NoMatch from "./no-match"
import AddNames from "./add-names"

export default class App extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          loggedInStatus: "NOT_LOGGED_IN",
          userName: ""
        }
      }

      handleSuccessfulLogin = (name) => {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          userName: name
        })
      }
    
      handleUnsuccessfulLogin = () => {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        })
      }
    
      handleSuccessfulLogout = () => {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          userName: ""
        })
      }
    
    //   Not working, should check logged in status on mount
      checkLoginStatus = () => {
          const loggedInStatus = this.state.loggedInStatus
    
          if(this.state.userName && loggedInStatus === "LOGGED_IN") {
            return loggedIn
          }else if (this.state.userName && loggedInStatus === "NOT_LOGGED_IN") {
            this.setState({
              loggedInStatus: "LOGGED_IN"
            })
          }else if(!this.state.userName && loggedInStatus === "LOGGED_IN"){
            this.setState({
              loggedInStatus: "NOT_LOGGED_IN"
            })
          }
      }
    
      componentDidMount() {
        this.checkLoginStatus()
      }

render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavBar 
              loggedInStatus={this.state.loggedInStatus} 
              userName={this.state.userName}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
              handleSuccessfulLogin={this.handleSuccessfulLogin}
            />

            <Switch>
              <Route exact path="/" component={SearchForm} />
              <Route path="/add-names" 
                render = {props => (
                  <AddNames 
                    {...props} 
                    handleSuccessfulLogin={this.handleSuccessfulLogin} 
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin} 
                  />
                )} 
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
