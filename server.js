const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const nocache = require("nocache");

app.set("etag", false);
app.use(nocache());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("pages/room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId, userId) => {
    console.log("joininsss room");
    socket.join(roomId);
    socket.to(roomId).emit("userConnected", userId);
  });
});

server.listen(30001, () => {
  console.log("server is running on https://voice.farzinahmadi.com");
});
