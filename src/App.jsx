import Die from "./components/Die"
import './App.css'
import { useEffect, useState } from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() =>{
    const value = dice[0].value
    const allHeld = dice.every(die => die.isHeld)
    const allSame = dice.every(die => die.value === value)
    if (allHeld && allSame) {
      setTenzies(true)
    }
  }, [dice])

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
    } else {
      setDice(allNewDice())
      setTenzies(false)
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

  return (
      <main>
        {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die-container">
          {dices}
        </div>
        <button onClick={rollDice} className="roll-button">{tenzies ? 'Play again' : 'Roll'}</button>
      </main>
  )
}
