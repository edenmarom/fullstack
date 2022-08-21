import http from "http";
import { app } from "./http-server.js";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, { cors: { origins: "*:*" } });

let userCounter = 0;
io.on("connection", (socket) => {
  console.log("connection");
  userCounter++;
  io.emit("counter", userCounter);

  socket.on("disconnect", () => {
    userCounter--;
    io.emit("counter", userCounter);
  });
});
const port = 8080;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
