import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import game from "./chess/chess.js";

function App() {
  const [position, setPosition] = useState(game.fen());

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen());

    // Check if it's a promotion
    const piece = gameCopy.get(sourceSquare);
    const isPawnPromotion =
      piece?.type === "p" &&
      ((sourceSquare[1] === "7" && targetSquare[1] === "8") ||
        (sourceSquare[1] === "2" && targetSquare[1] === "1"));

    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: isPawnPromotion ? "q" : undefined, // Only promote if it's a pawn
      });

      if (move === null) {
        console.log("Illegal move attempted:", { sourceSquare, targetSquare });
        return false; // Snap back
      }

      game.move(move);
      setPosition(game.fen());
      return true;
    } catch (e) {
      console.error("Error making move:", e);
      return false;
    }
  }

  return (
    <div className="app">
      <h1>Chess App</h1>
      <div style={{ width: "800px", margin: "0 auto" }}>
        <Chessboard
          className="chessboard"
          position={position}
          onPieceDrop={onDrop}
          animationDuration={200}
          boardOrientation="white"
        />
      </div>
    </div>
  );
}

export default App;
