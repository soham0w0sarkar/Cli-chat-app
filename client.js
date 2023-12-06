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
    process.stdout.write("Me: ");

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
