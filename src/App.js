import React, {useState} from 'react';

const Square = (props) =>
{
  return (
    <button className="square" onClick={() =>  props.onClick()} >
      {props.value}
    </button>
  )
}

const Board = () => {
  const [squares, setSquares] = useState( Array(9).fill(null))
  
  const handleClick = (i) => {
    
    
    const newSquares = squares.slice();
    newSquares[i] = 'X'
    setSquares(newSquares)
    console.log("clik", i, newSquares)
  }


  const rendSquare = (i) => {
    return (<Square value={squares[i]} onClick= {() =>handleClick(i)}/>)
  }

  return (
    <div>
      <div>
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

function App() {
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
  );
}

export default App;
