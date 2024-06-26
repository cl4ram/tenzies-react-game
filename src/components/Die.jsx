/* eslint-disable react/prop-types */
import {nanoid} from "nanoid"


export default function Die(props) {

const dotsArray = Array.from({length: props.value}, () => 1)

const dots = dotsArray.map(() => <div key={nanoid()} className='dot'/>)

return (
    <button className={"die die-" + props.value} style={{backgroundColor: props.isHeld && '#59E391' }} onClick={props.hold} aria-label={props.value}>
        {dots}
    </button>
)
}
