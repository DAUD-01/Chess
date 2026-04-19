import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (msg) => {
      console.log("Server says:", msg);
    });
  }, []); // [] means this hook will run once only when the component loads

  return <h1>Chess App</h1>;
}

export default App;
