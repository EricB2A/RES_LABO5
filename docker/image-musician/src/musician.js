import { v4 as uuid } from "uuid";
import dgram from "dgram";
import { MUSICIAN_CONFIG, NETWORK } from "./config.js";

/**
 * List of instruments with their sounds
 */
const INSTRUMENTS = {
    piano: "ti-ta-ti",
    trumpet: "pouet",
    flute: "trulu",
    violin: "gzi-gzi",
    drum: "boum-boum",
};

/**
 * Musician class.
 */
class Musician {
    constructor(instrument) {
        // If the given instrument doesn't exist, throw error
        if (!Object.keys(INSTRUMENTS).includes(instrument)) {
            throw new Error("L'instrument n'existe pas");
        }
        // the the id of the musician and keep what instrument it's playing
        this.instrument = instrument;
        this.id = uuid();
    }

    /**
     * Make the musician play. It's return the uuid of the musician with the sound of his instruements
     * 
     * @returns {Object} uuid and sound of his instruments
     */
    play() {
        return {
            uuid: this.id,
            sound: INSTRUMENTS[this.instrument],
        };
    }
}

const musician = new Musician(process.argv[2]);
const socket = dgram.createSocket("udp4");

/**
 * Every second (or MUSICIAN_CONFIG.play_interval [ms]), make the musician plays on the UDP connection.
 */
setInterval(() => {
    socket.send(
        JSON.stringify(musician.play()),
        NETWORK.port,
        NETWORK.ip,
        (err, _) => {
            // If an error occurs close the socket and clear the interval
            if (err !== null) {
                socket.close();
                clearInterval(this);
            }
        }
    );
}, MUSICIAN_CONFIG.play_interval);
