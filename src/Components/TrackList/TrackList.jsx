import Track from "../Track/Track"

import "./TrackList.css"

const TrackList = ({ trackList, onAdd, onRemove, isRemoval }) => {
    return (
        <div className="TrackList">
            {trackList.map(track => (
                <Track
                    track={track}
                    key={track.id}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemoval={isRemoval}
                />
            ))}
        </div>
    )
}

export default TrackList
