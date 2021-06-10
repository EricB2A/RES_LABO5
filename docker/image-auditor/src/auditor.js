const dgram = require("dgram");
var net = require("net");

const PORT_UDP = 1450;
const PORT_TCP = 2205;

const INSTRUMENTS = {
    "ti-ta-ti": "piano",
    pouet: "trumpet",
    trulu: "flute",
    "gzi-gzi": "violin",
    "boum-boum": "drum",
};

const socket = dgram.createSocket("udp4");
let musicians = new Map();

socket.bind(PORT_UDP, function () {
    console.log("Joining multicast group");
    socket.addMembership("239.255.22.5");
});

socket.on("message", (message) => {
    let msg = JSON.parse(message);
    musicians.set(msg.uuid, {
        instrument: INSTRUMENTS[msg.sound],
        lastMsg: new Date(),
    });
});

const server = net.createServer();
server.listen(PORT_TCP);
server.on("connection", (socket) => {
    const aryMusicians = [];
    musicians.forEach((v, k) => {
        aryMusicians.push({
            uuid: k,
            instrument: v.instrument,
            activeSince: v.lastMsg,
        });
    });
    socket.write(JSON.stringify(aryMusicians));
    socket.end();
});
server.on("data", (socket) => {
    console.log(socket);
});
server.on("error", (err) => {
    throw err;
});

setInterval(() => {
    musicians = new Map(
        [...musicians].filter(([k, v]) => {
            return Date.now() - v.lastMsg <= 5000;
        })
    );
}, 1000);
