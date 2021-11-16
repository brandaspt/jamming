import TrackList from "../TrackList/TrackList"
import "./Playlist.css"

const Playlist = ({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) => {
    return (
        <div className="Playlist">
            <input defaultValue={"Playlist Name"} onChange={e => onNameChange(e.target.value)} />
            <TrackList trackList={playlistTracks} onRemove={onRemove} isRemoval={true} />
            <button className="Playlist-save" onClick={onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    )
}

export default Playlist
