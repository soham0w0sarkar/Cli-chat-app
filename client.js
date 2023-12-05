import readline from "readline";
import { io } from "socket.io-client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("http://localhost:9090/");

socket.on("connect", () => {
  console.log("User Connected!!! ");

  rl.question("Enter your Username: ", (username) => {
    rl.setPrompt("");
    rl.prompt();

    rl.on("line", (msg) => {
      socket.emit("chat-msg", `${username}: ${msg}`);
    });
  });
});

socket.on("chat-msg", (msg) => {
  console.log(msg);
});
