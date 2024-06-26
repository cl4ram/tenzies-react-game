/* eslint-disable react/prop-types */

export default function RollTracker(props) {
    return (
        <div className="roll-tracker-container">
            <h2>Your rolls: <b>{props.rolls}</b> </h2> 
        </div>
    )
}