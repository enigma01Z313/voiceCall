const socket = io("/");
const myPeer = new Peer(undefined, {
  host: "/",
  port: "9000",
});
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement('video')
myVideo.muted = true;

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)
})

myPeer.on("open", (id) => {
  socket.emit("joinRoom", {
    roomId,
    userId: id,
  });
});

socket.on("userConnected", (userId) => {
  console.log(userId);
});
