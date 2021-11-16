import { useState } from "react"
import "./SearchBar.css"

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <div className="SearchBar">
            <input
                placeholder="Enter A Song, Album, or Artist"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="SearchButton" onClick={() => onSearch(searchQuery)}>
                SEARCH
            </button>
        </div>
    )
}

export default SearchBar
