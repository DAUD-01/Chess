import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Chessboard } from "react-chessboard"; // UI chess board
import game from "./chess/chess.js"; // chess logic

const socket = io("http://localhost:5000");

function App() {
  const [position, setPosition] = useState(game.fen());

  useEffect(() => {
    socket.on("move", (data) => {
      console.log("Opponent move:", data);

      try {
        game.move({
          from: data.from,
          to: data.to,
          promotion: "q",
        });
      } catch {
        return;
      }

      setPosition(game.fen()); // set position and update board visually
    });

    return () => socket.off("move");
  }, []);

  function onDrop(sourceSquare, targetSquare) {
    if (!targetSquare) return false;

    let move = null;

    try {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    } catch {
      return false;
    }

    if (!move) return false;

    setPosition(game.fen());

    socket.emit("move", {
      from: sourceSquare,
      to: targetSquare,
    });

    return true;
  }

  return (
    <div
      className="app-container"
      style={{
        textAlign: "center",
      }}
    >
      <h1>Chess App</h1>
      <div
        style={{
          width: "500px",
          margin: "0 auto",
        }}
      >
        <Chessboard
          options={{
            position,
            onPieceDrop: onDrop,
            animationDurationInMs: 200,
            boardOrientation: "white",
          }}
        />
      </div>
    </div>
  );
}

export default App;
