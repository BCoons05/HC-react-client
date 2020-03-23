import React, {Component} from 'react'
import axios from 'axios'
import DropZone, { DropzoneComponent } from 'react-dropzone-component'

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"

export default class AddNames extends Component {
    constructor(props){
        super(props)
 
        this.state={
            nameToAdd:"",
            addressToAdd:"",
            ageToAdd: "",
            interestsToAdd: "",
            photoToAdd: "https://source.unsplash.com/random",
            photoView: "",
            setVisible: true
        }

        this.thumbRef = React.createRef()
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios
        .post('http://localhost:5000/api/User', {
            "name": this.state.nameToAdd,
            "address": this.state.addressToAdd,
            "age": parseInt(this.state.ageToAdd),
            "interests": this.state.interestsToAdd,
            "photo": this.state.photoToAdd
        })
        .then(data => {
            this.setState({
                nameToAdd:"",
                addressToAdd:"",
                ageToAdd: "",
                interestsToAdd: "",
            })
        })
        .catch(err => [
            console.log("Error adding user: ", err)
        ])
      }

      handleThumbDrop =() => {
        return {
            addedfile: file => this.setState({ photoView: file})
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    componentConfig = () => {
        return{
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    // buildForm = () => {
    //     let formData = new FormData()

    //     formData.append("name", this.state.nameToAdd)
    //     formData.append("address", this.state.addressToAdd)
    //     formData.append("age", parseInt(this.state.ageToAdd))
    //     formData.append("interests", this.state.interestsToAdd)

    //     if(this.state.photoToAdd){
    //         formData.append("photo", this.state.photoToAdd)
    //     }
        
    //     // for(let value of formData.values()){
    //     //     console.log(value)
    //     // }

    //     return formData
    // }

    // handleSetVisible = () => {
    //     this.setState({ setVisible: true })
    // }

    render(){
        return(
            <div className="search-page-wrapper">
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
                                    <h3>Profile Picture</h3>
                                        <DropzoneComponent
                                            ref={this.thumbRef}
                                            config={this.componentConfig()}
                                            djsConfig={this.djsConfig}
                                            eventHandlers={this.handleThumbDrop()}
                                        >
                                                <div className="dz-message">Click to Add Photo</div>
                                        </DropzoneComponent>
                                </div>
                            </div>
                            <div className="one-column">
                                <button className="btn" type="submit">Add</button>
                            </div> 
                        </form>
                    </div>
            </div>
        )
    }
}