import React, { useState } from 'react'
debugger

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
    if (winner !=="tie") { 
      status = 'Winner '
      status += xIsNext ? 'O' : 'X'
    }
    else status = "Tie"
  }
  
  const minimax = (node, xNext, depth) =>{
    
    const convertValue = (v,d) => {
      if ( v === "tie" ) v=0
      if ( v === 'X' ) v = 1 * depth //(!xNext ? (1) : (-1))
      if ( v === 'O' ) v = -1 *depth //(xNext ? (-1) :  (1))
      return v
    }
 
    let value = calculateWinner(node)
    value = convertValue(value, depth)
        
    if ( (value !=null) || (depth===0) ) {
      return value
    }

    let n = 8
    
    value = (xNext ? -Infinity : Infinity)
      
    while (n>=0) {
      if ( node[n] == null) {
        node[n] = ( xNext ? 'X' : 'O' )
        let tmpvalue= minimax(node, !xNext, depth -1)
        
        if (tmpvalue != null) {
          if (xNext) {
            value = Math.max(value, tmpvalue)
          } 

          if (!xNext) {
            value = Math.min(value, tmpvalue)
          }
        }
         node[n] = null
      }
      n--
    }        
    return value
  }

  const handleClick = (i) => {
    if ( squares[i] == null) {
    
      let win = winner
      let next = xIsNext
      let newSquares = squares.slice()

      if (win == null ) {
        console.log('clik', i, squares, status, xIsNext)
        newSquares[i] = xIsNext ? 'X' : 'O'
        next = !xIsNext

        console.log('clikaft', i, newSquares, status, xIsNext)
        win = calculateWinner(newSquares)
      }

      if (win === null && ai === true) {
        let n= newSquares.length -1
        let winSquares = Array(9).fill(null)
        let empty = []
        let emptyCount=0
        
        while (n>=0) {
          if (newSquares[n] === null) {
            emptyCount++
            empty.push(n)
            newSquares[n] = next ? 'X' : 'O'

            winSquares[n]=(minimax(newSquares, !next, 7))

            newSquares[n] = null

          }
          n--
        }

        console.log("win ",winSquares)

        let noNullWin = winSquares.filter(nu => nu!=null)

        let max = Math.max(...noNullWin)
        let min = Math.min(...noNullWin)
        
        let best = ( next ? max : min )
        
        n=8
        let choise=[]
        let count = 0

        while (n>=0) {
          if (winSquares[n] === best) {
            choise.push(n)
            count++
          }
          n--
        }



        n = Math.floor(Math.random() * count)
        n = choise[n]

        newSquares[ n ] = next ? 'X' : 'O'
        next = !next
        win = calculateWinner(newSquares)
      }

      setXIsNext(next)
      setWinner(win)
      setSquares(newSquares)
    }
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
