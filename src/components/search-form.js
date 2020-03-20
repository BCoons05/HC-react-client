import React, {Component} from 'react'
import axios from 'axios'

import SearchResults from "./search-results"

export default class SearchForm extends Component {
    constructor(props){
        super(props)
 
        this.state={
            searchTerm:"",
            searchResults: [],
            setVisible: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.searchResults.length > 0){
            this.setState({
                searchResults: []
            })
        }

        axios
        .get('http://localhost:5000/api/User')
        .then(response => {
            
            response.data.forEach(user => {
                // console.log(user)
                this.checkTerm(user)
            })
        })
        .then(data => {
            console.log("resetting state values")
            this.setState({
                searchTerm: "",
                setVisible: false
            })
        })
        .catch(err => [
            console.log("Error getting users, or end of data: ", err)
        ])
      }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

checkTerm = (user) => {
    if(this.state.searchTerm && user.name.includes(this.state.searchTerm)){
        this.setState({
            searchResults: [user].concat(this.state.searchResults)
        })
    } else if(this.state.searchTerm && user.name.includes(this.state.searchTerm == false)){
        null
    } 
}

handleSetVisible = () => {
    this.setState({ setVisible: true })
}

    render(){
        return(
            <div className="search-page-wrapper">
                {this.state.setVisible ? 
                    (
                    <div className="form-wrapper">
                        <form onSubmit={this.handleSubmit} className="search-form-wrapper">
                            <div className="one-column">
                                <div>
                                    <h3>Search by Name</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchTerm"
                                        placeholder="Ex: John or John Doe"
                                        value={this.state.searchTerm}
                                    />
                                </div>
                            </div>
                            <div className="one-column">
                                <button className="btn">Search</button>
                            </div> 
                        </form>
                    </div>)
                    :
                    (
                    <div className="one-column">
                        <div className="results-container">
                            {this.state.searchResults.length > 0 ? <SearchResults data={this.state.searchResults} /> : <h2>No users that match your criteria, please enter a different name or term</h2>}
                            <button className="new-search-btn" onClick={() => this.handleSetVisible()}>New Search</button>
                        </div>
                    </div>
                    )
            }
            </div>
        )
    }
}