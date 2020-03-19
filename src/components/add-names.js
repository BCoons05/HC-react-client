import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'

export default class AddNames extends Component {
    constructor(props){
        super(props)
 
        this.state={
            nameToAdd:"",
            addressToAdd:"",
            ageToAdd: "",
            interestsToAdd: "",
            photoToAdd: "",
            setVisible: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios
        .post('http://localhost:5000/api/User', {
            Name: this.state.nameToAdd,
            Address: this.state.addressToAdd,
            Age: this.state.ageToAdd,
            Interests: this.state.interestsToAdd,
            Photo: this.state.photoToAdd
        })
        .then(data => {
            console.log("resetting state values")
            this.setState({
                nameToAdd:"",
                addressToAdd:"",
                ageToAdd: "",
                interestsToAdd: "",
                Photo: "",
                setVisible: false
            })
        })
        .catch(err => [
            console.log("Error adding user: ", err)
        ])
      }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
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
                            <div className="two-column">
                                <div>
                                    <h3>Name</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="nameToAdd"
                                        placeholder=""
                                        value={this.state.nameToAdd}
                                    />
                                </div>
                                <div>
                                    <h3>Address</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="addressToAdd"
                                        placeholder=""
                                        value={this.state.addressToAdd}
                                    />
                                </div>
                            </div>
                            <div className="two-column">
                                <div>
                                    <h3>Age</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="ageToAdd"
                                        placeholder=""
                                        value={this.state.ageToAdd}
                                    />
                                </div>

                                <div>
                                    <h3>Interests</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="interestsToAdd"
                                        placeholder=""
                                        value={this.state.interestsToAdd}
                                    />
                                </div>
                            </div>
                            
                            <div className="one-column">
                                <div>
                                    <h3>Picture</h3>
                                    <input
                                        type="text"
                                        onChange={this.handleChange}
                                        name="photoToAdd"
                                        placeholder=""
                                        value={this.state.photoToAdd}
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
                            {this.state.searchResults.length > 0 ? <SearchResults data={this.state.searchResults} /> : <h2>No users that match your criteria, please enter a different term</h2>}
                            <button className="new-search-btn" onClick={() => this.handleSetVisible()}>New Search</button>
                        </div>
                    </div>
                    )
            }
            </div>
        )
    }
}