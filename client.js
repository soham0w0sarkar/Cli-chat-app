import readline from "readline";
import { io } from "socket.io-client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const socket = io("https://chat-app-socketio-inpt.onrender.com");

rl.question("Enter your Username: ", (username) => {
  socket.on("connect", () => {
    console.log("Connected to Server!!!");

    rl.on("line", (msg) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      socket.emit("chat-msg", `${username}: ${msg}`);

      process.stdout.write("Me: ");
    });
  });
});

socket.on("chat-msg", (msg) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);

  console.log(msg);

  process.stdout.write("Me: ");
});
