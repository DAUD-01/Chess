import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
