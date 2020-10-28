
import React, { useState } from 'react'

const Square = (props) => {
  return (
    <button className="square" onClick={() => props.onClick()} >
      {props.value}
    </button>
  )
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState(null)

  let ai = true
  let status = 'Next player '
  status += xIsNext ? 'X' : 'O'

  if (winner) {
    if (winner !="tie") { 
      status = 'Winner '
      status += xIsNext ? 'O' : 'X'
    }
    else status = "Tie"
  }
  const handleClick = (i) => {
    let win = winner
    let next = xIsNext
    let newSquares = squares.slice()

    if (win == null && squares[i] == null) {
      console.log('clik', i, squares, status, xIsNext)
      newSquares[i] = xIsNext ? 'X' : 'O'
      next = !xIsNext

      console.log('clikaft', i, newSquares, status, xIsNext)
      win = calculateWinner(newSquares)
    }

    if (win === null && ai === true) {
      let i= newSquares.length
      let count = 0
      let empty = []

      while (i--) {
        if (newSquares[i] === null) {
          empty.push(i)
          count++
        }

      }
      newSquares[ Math.floor(Math.random()) * count ] = next ? 'X' : 'O'
      next = !next
      win = calculateWinner(newSquares)
      console.log("tyhjiä ",count, empty)
      
    }

    setXIsNext(next)
    setWinner(win)
    setSquares(newSquares)
  }

  const newGameClick = () => {
    setSquares(Array(9).fill(null))
    setWinner(null)
    setXIsNext(true)
  }

  function calculateWinner ( x ) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (x[a] && x[a] === x[b] && x[a] === x[c]) {
        return x[a]
      }
    }
    if (!x.includes(null)) {
      return "tie"}
    return null
  }

  const rendSquare = (i) => {
    return (<Square value={squares[i]} onClick= {() => handleClick(i)}/>)
  }

  const NewGame = () => {
    return (
      <div className="newgame"><button onClick ={ () => newGameClick()}>New game</button></div>
    )
  }

  console.log('status', status)
  return (
    <div>
      <div>
        <div className="status">{ status }</div>
        <div className="board">
          <div className="board-row">
            {rendSquare(0)}
            {rendSquare(1)}
            {rendSquare(2)}
          </div>
          <div className="board-row">
            {rendSquare(3)}
            {rendSquare(4)}
            {rendSquare(5)}
          </div>
          <div className="board-row">
            {rendSquare(6)}
            {rendSquare(7)}
            {rendSquare(8)}
          </div>
        </div>
        <p></p>
        <NewGame />
      </div>
    </div>
  )
}

function App () {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

export default App
