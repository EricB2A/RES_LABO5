import dgram from "dgram";
import net from "net";
import { AUDITOR_CONFIG, NETWORK } from "./config.js";

// Object containg the sounds of the instruments matching the instruments making them.
const INSTRUMENTS = {
    "ti-ta-ti": "piano",
    pouet: "trumpet",
    trulu: "flute",
    "gzi-gzi": "violin",
    "boum-boum": "drum",
};

// UDP connection
const udpSocket = dgram.createSocket("udp4");

// List of musicians that the auditor has heard the past five seconds
let musicians = new Map();

/**
 * Make the UDP connection on the specific multicast ip
 */
udpSocket.bind(NETWORK.udp.port, () => {
    udpSocket.addMembership(NETWORK.udp.ip);
});

/**
 * When receiving the sound/message from musician. Store the musician info in the map musicians
 */
udpSocket.on("message", (message) => {
    let msg = JSON.parse(message);
    musicians.set(msg.uuid, {
        instrument: INSTRUMENTS[msg.sound],
        lastMsg: new Date(),
    });
});


// Create a TCP server to get the active musicians
const tcpServer = net.createServer();
tcpServer.listen(NETWORK.tcp.port);

/**
 * When a connection is etablished, send the list of active musicians
 */
tcpServer.on("connection", (tcpSocket) => {
    const aryMusicians = [];
    musicians.forEach((v, k) => {
        aryMusicians.push({
            uuid: k,
            instrument: v.instrument,
            activeSince: v.lastMsg,
        });
    });
    tcpSocket.write(JSON.stringify(aryMusicians));
    tcpSocket.end();
});

/**
 * Log tcpServer error if one occurs
 */
tcpServer.on("error", (err) => {
    console.error(err)
});

/**
 * Every second (or AUDITOR_CONFIG.clean_musicians_interval[ms]), remove all the inactive musicians
 */
setInterval(() => {
    musicians = new Map(
        [...musicians].filter(([_, v]) => {
            return Date.now() - v.lastMsg <= AUDITOR_CONFIG.max_musician_delay;
        })
    );
}, AUDITOR_CONFIG.clean_musicians_interval);
