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

      game.move({
        from: data.from,
        to: data.to,
        promotion: "q",
      });

      setPosition(game.fen());
    });

    return () => socket.off("move");
  }, []);

  function onDrop(sourceSquare, targetSquare) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (!move) return false;

    setPosition(game.fen());

    socket.emit("move", {
      from: sourceSquare,
      to: targetSquare,
    });

    return true;
  }

  return (
    <div className="app">
      <h1>Chess App</h1>
      <div
        style={{
          width: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
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
