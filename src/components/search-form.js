import React, {Component} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import SearchResults from "./search-results"
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faSpinner)

export default class SearchForm extends Component {
    constructor(props){
        super(props)
 
        this.state={
            searchTerm:"",
            searchResults: [],
            setVisible: true,
            isLoading: true
        }
    }

    stopLoading = () => {
        this.setState({
            isLoading: false
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.searchResults.length > 0){
            this.setState({
                searchResults: []
            })
        }

        setTimeout(this.stopLoading, 1000)

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
                setVisible: false,
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
        } else { null }
    }

    deleteUser = id => {
        axios
        .delete(`http://localhost:5000/api/User/${id}`)
        .then(
            this.setState({searchResults: this.state.searchResults.filter(result => {
                return result.id !== id
        })}))
        .catch(error => console.log("delete user error: ", error))
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
                    this.state.isLoading ? 
                        (
                        <div className="one-column">
                                <div className="content-loader">
                                    <FontAwesomeIcon icon="spinner" spin />
                                </div>
                        </div>
                        )
                    :
                    (
                    <div className="one-column">
                        <div className="results-container">
                            {this.state.searchResults.length > 0 ? <SearchResults data={this.state.searchResults} deleteUser={this.deleteUser} /> : <h2>No users that match your criteria, please enter a different name or term</h2>}
                            <button className="new-search-btn" onClick={() => this.handleSetVisible()}>New Search</button>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }
}