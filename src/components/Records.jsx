/* eslint-disable react/prop-types */

export default function Records(props){
    return (
        <div className="scroes-container">
          <p>Your best rolls: <span>{props.bestRoll}</span></p>
          <p>Your best time: <span>{("0" + Math.floor((props.bestTime / 60000) % 60)).slice(-2)}:{("0" + Math.floor((props.bestTime/ 1000) % 60)).slice(-2)}:{("0" + (props.bestTime / 10) % 100).slice(-2)}</span></p>
        </div>
    )
}