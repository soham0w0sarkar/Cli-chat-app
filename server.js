import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connection Started............!!");

  socket.on("chat-msg", (msg) => {
    console.log("Message: " + msg);

    socket.broadcast.emit("chat-msg", msg);

    socket.on("disconnect", () => {
      console.log("User disconnected.......");
    });
  });
});

server.listen(9090, () => {
  console.log("Server running on 5050.........");
});
