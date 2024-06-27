import Die from "./components/Die"
import RollTracker from "./components/RollTracker"
import Timer from "./components/Timer"
import Records from "./components/Records"
import './App.css'
import { useEffect, useState } from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(true)
  const [bestRoll, setBestRoll] = useState(parseInt(localStorage.getItem("bestRolls")) || null)
  const [bestTime, setBestTime] = useState(parseInt(localStorage.getItem("bestTime")) || null)
  const [startGame, setStartGame] = useState(false)

  useEffect(()=>{
    let interval = null
    if (running) {
      interval = setInterval(()=> {
        setTime(prevTime => prevTime + 10)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [running])

  useEffect(() =>{
    const value = dice[0].value
    const allHeld = dice.every(die => die.isHeld)
    const allSame = dice.every(die => die.value === value)
    if (allHeld && allSame) {
      setTenzies(true)
      setRunning(false)
      checkBestRolls()
      checkBestTime()
    }
  }, [dice])

  function start(){
    setStartGame(true)
  }

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const arr = []
    for (let i = 0; i < 10; i++){
      arr.push(generateDie())
    }
    return arr
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDices => prevDices.map(die => {
        return die.isHeld ?
        die :
        generateDie()
      }))
      setRolls(prevRolls => prevRolls + 1)
    } else {
      setDice(allNewDice())
      setTenzies(false)
      setRolls(0)
      setTime(0)
      setRunning(true)
    }
  }

  function hold(id){
    setDice(prevDices => prevDices.map(die => {
        return die.id === id ?
        {...die,
          isHeld: !die.isHeld 
        } :
        die
      }
    ))
  }

  const dices = dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld} hold={()=> hold(die.id)}/>)
  const storedRolls = parseInt(localStorage.getItem("bestRolls"))
  const storedTime =  parseInt(localStorage.getItem("bestTime"))

  function checkBestRolls(){
    if (rolls < storedRolls) {
      localStorage.setItem("bestRolls", rolls)
      setBestRoll(rolls)
    } else if (!storedRolls) {
      localStorage.setItem("bestRolls", rolls)
      setBestRoll(rolls)
    } else {
      return
    }
  }

  function checkBestTime(){
    if (time < storedTime) {
      localStorage.setItem("bestTime", time)
      setBestTime(time)
    } else if (!storedTime) {
      localStorage.setItem("bestTime", time)
      setBestTime(time)
    } else {
      return
    }

  }

  return (
      <main>
        {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {
        !startGame 
        ? 
        <button className="start-button" onClick={start}>Start Game</button>
        :
        <div className="game-container">
            <div className="tracker">
              <RollTracker rolls={rolls} />
              <Timer time={time}/>
            </div>
            <div className="die-container">
              {dices}
            </div>
            <button onClick={rollDice} className="roll-button">{tenzies ? 'Play again' : 'Roll'}</button>
        </div>
        }
        {(bestRoll && bestTime) && <Records bestRoll={bestRoll} bestTime={bestTime}/> }
      </main>
  )
}
