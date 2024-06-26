/* eslint-disable react/prop-types */

export default function Timer(props){
    return (
        <div className="timer-container">
            <h2>Your time: <b>{"0" + Math.floor((props.time / 60000) % 60)}:{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:{("0" + (props.time / 10) % 100).slice(-2)}</b> </h2> 
        </div>
    )
}