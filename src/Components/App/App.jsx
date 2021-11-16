import { useState } from "react"
import SearchResults from "../SearchResults/SearchResults"
import SearchBar from "../SearchBar/SearchBar"
import Playlist from "../Playlist/Playlist"
import Spotify from "../../util/Spotify"

import "./App.css"

const App = () => {
    const [searchResults, setSearchResults] = useState([])
    const [playlistName, setPlaylistName] = useState("Playlist Name")
    const [playlistTracks, setPlaylistTracks] = useState([])

    const addTrack = newTrack => {
        const foundTrack = playlistTracks.find(track => track.id === newTrack.id)
        if (!foundTrack) setPlaylistTracks(prev => [...prev, newTrack])
    }
    const removeTrack = trackToRemove => {
        setPlaylistTracks(playlistTracks.filter(track => track.id !== trackToRemove.id))
    }
    const updatePlaylistName = newName => setPlaylistName(newName)
    const savePlaylist = () => {
        const trackURIs = playlistTracks.map(track => track.uri)
        Spotify.savePlaylist(playlistName, trackURIs)
        setPlaylistTracks([])
        setPlaylistName("Playlist Name")
    }
    const search = async query => {
        setSearchResults(await Spotify.search(query))
    }

    return (
        <div>
            <h1>
                Ja<span className="highlight">mmm</span>ing
            </h1>
            <div className="App">
                <SearchBar onSearch={search} />
                <div className="App-playlist">
                    <SearchResults searchResults={searchResults} onAdd={addTrack} />
                    <Playlist
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onRemove={removeTrack}
                        onNameChange={updatePlaylistName}
                        onSave={savePlaylist}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
