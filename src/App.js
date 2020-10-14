/* eslint-disable react/prop-types */
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

  setWinner(calculateWinner())
  let status = 'Next player '
  status += xIsNext ? 'X' : 'O'

  if (winner) {
    status = 'Winner '
    status += xIsNext ? 'O' : 'X'
  }

  const handleClick = (i) => {
    if (winner == null && squares[i] == null) {
      console.log('clik', i, squares, status, xIsNext)
      const newSquares = squares.slice()
      newSquares[i] = xIsNext ? 'X' : 'O'
      setSquares(newSquares)
      setXIsNext(!xIsNext)

      console.log('clikaft', i, newSquares, status, xIsNext)
    }
  }

  function calculateWinner () {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const rendSquare = (i) => {
    return (<Square value={squares[i]} onClick= {() => handleClick(i)}/>)
  }

  console.log('status', status)
  return (
    <div>
      <div>
        <div className="status">{ status }</div>
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
