const dgram = require("dgram");

const PORT = 41234
const IP   = "127.0.0.1"

console.log("Audtior...")

const socket = dgram.createSocket("udp4")


socket.on("message", (message) => {
   let msg = JSON.parse(message);
   console.log("MESSAGE");
   console.log(msg);
});
