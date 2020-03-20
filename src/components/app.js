import React, { Component } from "react";
// import GoogleLogin from 'react-google-login';

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
          // userName: ""
        }
      }

      handleSuccessfulLogin = () => {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          // userName: name
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
          // userName: ""
        })
        
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
