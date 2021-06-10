import { v4 as uuid } from "uuid";
import dgram from "dgram";

const instruments = {
  piano: "ti-ta-ti",
  trumpet: "pouet",
  flute: "trulu",
  violin: "gzi-gzi",
  drum: "boum-boum",
};

const socket = dgram.createSocket("udp4");

class Musician {
  constructor(instrument) {
    if (!Object.keys(instruments).includes(instrument)) {
      throw new Error("L'instrument n'existe pas");
    }
    this.instrument = { name: instrument, sound: instruments[instrument] };
    this.id = uuid();
  }

  play() {
    const data = {
      uuid: this.id,
      sound: this.instrument.sound,
    };
    console.log(data);
    return data;
  }
}
const pianist = new Musician("piano");

setInterval(() => {
  socket.send(
    JSON.stringify(pianist.play()),
    1450,
    "127.0.0.1",
    (err, bytes) => {
      if (err !== null) {
        console.error("ERR:", err);
        socket.close();
        clearInterval(this);
      }
    }
  );
});
