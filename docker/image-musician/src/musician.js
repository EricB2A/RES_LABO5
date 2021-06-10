import { v4 as uuid } from "uuid";
import dgram from "dgram";

console.log(dgram)

const instruments = {
  piano: "ti-ta-ti",
  trumpet: "pouet",
  flute: "trulu",
  violin: "gzi-gzi",
  drum: "boum-boum",
};

class Musician {
  constructor(instrument) {
    if (!Object.keys(instruments).includes(instrument)) {
      throw new Error("L'instrument n'existe pas");
    }
    this.instrument = { name: instrument, sound: instruments[instrument] };
    console.log("constructor", this.instrument);
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

setInterval(pianist.play.bind(pianist), 1000);
