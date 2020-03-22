import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchResults = (props) => {
    const searchResultList = props.data.map(searchResult => {
        return(
            <div key={searchResult.id} className="search-result-wrapper">
                <div className="search-result-content">
                    <div className="profile-pic"><img src={searchResult.photo} /></div>
                    <div className="search-result-user-header">
                        <h2>{searchResult.name}</h2>
                        <div>Age: {searchResult.age}</div>
                        <div className="search-result-user-details">
                            <div>Address: {searchResult.address}</div>
                        </div>
                        <div>Interests: {searchResult.interests}</div>
                    </div>
                    <div className="delete-container"><button className="delete-btn" onClick={() => props.deleteUser(searchResult.id)}>X</button></div>
                </div>
            </div>
        )
    })

    return <div className="search-results-list-wrapper">{searchResultList}</div>
}

export default SearchResults