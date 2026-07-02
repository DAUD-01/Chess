import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const socket = io("http://localhost:5000");
const game = new Chess();

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

      setPosition(game.fen());
    });

    return () => socket.off("move");
  }, []);

  function onDrop({ sourceSquare, targetSquare }) {
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
    <div className="app-container">
      <h1>Chess App</h1>
      <div
        style={{
          width: "400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
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
