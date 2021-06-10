import { v4 as uuid } from "uuid";

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
    this.id = uuid();
    this.instrument = { name: instrument, sound: instruments[instrument] };
  }
  
  play() {
    const data = {
      uuid: this.id,
      sound: this.instrument.sound,
    };
    return data;
  }
}

const pianist = new Musician("piano");
console.log(pianist.play())
