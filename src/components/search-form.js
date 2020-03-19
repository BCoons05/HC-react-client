import React, {Component, useEffect, useState} from 'react'
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
    if(this.state.searchTerm && user.Name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
        this.setState({
            searchResults: [user].concat(this.state.searchResults)
        })
    } else if(this.state.searchTerm && user.Name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) == false){
        null
    } 
    else {
        this.checkYear(car)
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
                                {/* <div>
                                    <h3>Model</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchModel"
                                        placeholder="Model"
                                        value={this.state.searchModel}
                                    />
                                </div> */}
                            </div>
                            {/* <div className="two-column">
                                <div>
                                    <h3>From Year</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchYearMin"
                                        placeholder="Ex: 2015"
                                        value={this.state.searchYearMin}
                                    />
                                </div>

                                <div>
                                    <h3>To Year</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchYearMax"
                                        placeholder="Ex: 2019"
                                        value={this.state.searchYearMax}
                                    />
                                </div>
                            </div>
                            
                            <div className="two-column">
                                <div>
                                    <h3>Minimum Miles</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchMilesMin"
                                        placeholder="Ex: 50000"
                                        value={this.state.searchMilesMin}
                                    />
                                </div>
                                <div>
                                    <h3>Maximum Miles</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchMilesMax"
                                        placeholder="Ex: 100000"
                                        value={this.state.searchMilesMax}
                                    />
                                </div>
                            </div>
                            <div className="two-column">
                                <div>
                                    <h3>Minimum Price</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchPriceMin"
                                        placeholder="Ex: 11000"
                                        value={this.state.searchPriceMin}
                                    />
                                </div>
                                <div>
                                    <h3>Maximum Price</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="searchPriceMax"
                                        placeholder="Ex: 13000"
                                        value={this.state.searchPriceMax}
                                    />
                                </div>
                            </div> */}
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