const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT ?? 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static("public"));

io.on("connection", (socket) => {
  //on user typing
  socket.on("userTyping", (data) => {
    socket.broadcast.emit("userTyping", data);
  });

  //on getting new message from user
  socket.on("userMessage", (data) => {
    io.emit("userMessage", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is on: http://localhost:${PORT}`);
});
