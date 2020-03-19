import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchResults = (props) => {
    const searchResultList = props.data.map(searchResult => {
        return(
            <div key={searchResult.id} className="search-result-wrapper">
                <div className="search-result-content">
                    <div className="search-result-user-header">
                        <h2>{searchResult.Name} {searchResult.Address} {searchResult.Age}</h2>
                    </div>
                    <div className="search-result-user-details">
                        <div>{`${searchResult.Interests}`}</div>
                        <div>{`${searchResult.Photo}`}</div>
                    </div>
                </div>
            </div>
        )
    })

    return <div className="search-results-list-wrapper">{searchResultList}</div>
}

export default SearchResults