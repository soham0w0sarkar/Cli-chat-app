import readline from "readline";
import { io } from "socket.io-client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("https://cli-chat-app.onrender.com");

socket.on("connect", () => {
  console.log("Connected to Server!!!");

  rl.question("Enter your Username: ", (username) => {
    rl.on("line", (msg) => {
      socket.emit("chat-msg", `${username}: ${msg}`);
    });
  });
});

socket.on("chat-msg", (msg) => {
  console.log(msg);
});
