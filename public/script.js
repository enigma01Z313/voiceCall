const mainUrl = "https://voice.farzinahmadi.com/";
const socket = io(mainUrl);
const videoGrid = document.getElementById("video-grid");
const myPeer = new Peer();
const myPeer2 = new Peer({
  host: "/",
  port: "30010"
});
const myVideo = document.createElement("video");
myVideo.muted = true;

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const userVideo = document.createElement("video");

  call.on("stream", (userVideoStream) => {
    addVideoStream(userVideo, userVideoStream);
  });

  call.on("close", () => {
    // console.log("user closed");
    userVideo.remove();
  });
}

navigator.mediaDevices
  .getUserMedia({
    video: false,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement('video')

      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    });

    socket.on("userConnected", (userId) => {
      setTimeout(connectToNewUser, 1000, userId, stream);
    });
  });

myPeer.on("open", (id) => {
  console.log(`connected to online peer - id: ${id}`);
  socket.emit("joinRoom", roomId, id);
});

myPeer2.on("open", (id) => {
  console.log(`connected to my peer - id: ${id}`);
});
