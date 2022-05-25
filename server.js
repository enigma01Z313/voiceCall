const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT ?? 3001;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { v4: UUIDV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${UUIDV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    socket.to(roomId).emit("userConnected", userId);
  });

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
