import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import game from "./chess/chess";

function App() {
  const [position, setPosition] = useState(game.fen());

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen());

    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;

    game.move(move);
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
