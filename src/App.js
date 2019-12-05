import React from 'react';


const Square =  (props) =>
{
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}


function App() {

  var squares = [ 1,2,3,4,5,6,7,8,9]


  return (
    <div>
      <div>
        <div className="board-row">
        <Square value={squares[0]}/>
        <Square value={squares[1]}/>
        <Square value={squares[2]}/>
        </div>
        <div className="board-row">
        <Square value={squares[3]}/>
        <Square value={squares[4]}/>
        <Square value={squares[5]}/>
        </div>
        <div className="board-row">
        <Square value={squares[6]}/>
        <Square value={squares[7]}/>
        <Square value={squares[8]}/>
        </div>
      </div>
    </div>
  );
}

export default App;
