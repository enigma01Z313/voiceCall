const socket = io();

const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  output = document.getElementById("output"),
  button = document.getElementById("button"),
  typing = document.getElementById("typing");

button.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("userMessage", {
    handle: handle.value,
    message: message.value,
  });
});

message.addEventListener("keypress", (e) => {
  socket.emit("userTyping", handle.value);
});

//new message from server
socket.on("userMessage", (data) => {
  console.log(data);
  output.innerHTML += `
  <p>
    <strong>${data.handle}</strong>
    ${data.message}
  </p>`;
  message.value = typing.innerHTML = "";
});

//other users are typing
socket.on("userTyping", (data) => {
  typing.innerHTML = `<p><em>${data}</em> is typing...<p/>`;
});
