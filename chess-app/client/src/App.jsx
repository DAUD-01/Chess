import { useState } from "react";
import { Chessboard } from "react-chessboard";
import game from "./chess/chess";

function App() {
  const [position, setPosition] = useState(game.fen());

  function onDrop(sourceSquare, targetSquare) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;

    setPosition(game.fen());
    return true;
  }

  return (
    <div className="app">
      <h1>Chess App</h1>
      <Chessboard position={position} onPieceDrop={onDrop} />
    </div>
  );
}

export default App;
