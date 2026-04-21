import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors"; // allows frontend to connect with backend
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors()); // allows request from frontend to backend

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // 🟢 receive move from one player
  socket.on("move", (data) => {
    console.log("Move received:", data);

    socket.broadcast.emit("move", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
