import "./Track.css"

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{`${track.artist} | ${track.album}`}</p>
            </div>
            <button
                className="Track-action"
                onClick={isRemoval ? () => onRemove(track) : () => onAdd(track)}
            >
                {isRemoval ? "-" : "+"}
            </button>
        </div>
    )
}

export default Track
