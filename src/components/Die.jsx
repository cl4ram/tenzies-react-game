/* eslint-disable react/prop-types */

export default function Die(props) {

    const dotsArray = Array.from({length: props.value}, (v, i) => i)
    const dots = dotsArray.map((i) => <b key={i} className='dot'></b>)

    return (
        <button className={"die die-" + props.value} style={{backgroundColor: props.isHeld && '#59E391' }} onClick={props.hold} aria-label={props.value}>
            {dots}
        </button>
    )
}
