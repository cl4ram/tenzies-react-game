/* eslint-disable react/prop-types */

export default function Die(props) {
return (
    <div className="die" style={{backgroundColor: props.isHeld && '#59E391' }} onClick={props.hold}>
        <h2 className="die-value">{props.value}</h2>
    </div>
)
}
