import { DEFAULTS, SYNTH_SETTINGS } from "../constants";
import * as Tone from 'tone';

const { synthObjs, extraTime } = SYNTH_SETTINGS;

class Synth {
  constructor({ name, type, order, noteLength, settings, dynamicPitch }) {
    this.name = name;
    this.order = order;
    this.noteLength = noteLength;
    this.dynamicPitch = dynamicPitch;
    this.synth = new Tone[type](settings).connect(new Tone.Gain(.2).toDestination());
    this.sequence = new Tone.Sequence((time, note) => {
      const args = [note, noteLength, time + extraTime];
      // NoiseSynth has no pitch
      if (type === "NoiseSynth") {
        args.shift();
      }
      this.synth.triggerAttackRelease(...args);
    }, new Array(DEFAULTS.LENGTH).fill([])).start(0);
  }

  clearNotes() {
    this.setLength(this.sequence.events.length);
  }

  setLength(length) {
    this.sequence.events = new Array(length).fill([]);
  }

  setRow(row) {
    this.sequence.events = row;
  }

  toggleNote(beat, note) {
    const arr = [...this.sequence.events];
    arr[beat] = arr[beat].length === 0 ? [note] : []
    this.sequence.events = arr;
  }

  updateNote(beat, note) {
    const arr = [...this.sequence.events];
    arr[beat] = arr[beat].length === 0 ? [] : [note]
    this.sequence.events = arr;
  }
}

export class DrawScheduler {
  constructor(cb, length) {
    this.sequence = new Tone.Sequence((time, beat) => {
      Tone.getDraw().schedule(() => {
        if (Tone.getTransport().state === 'started') {
          cb(beat);
        }
      }, time);
    }, new Array(length).fill(0).map((_, i) => i)).start(0);
  }

  setLength(length) {
    this.sequence.events = new Array(length).fill(0).map((_, i) => i)
  }
}

export const rows = synthObjs.map(obj => new Synth(obj));

export const startAudio = (tempo) => {
  Tone.Transport.bpm.value = tempo;
  Tone.Transport.start('+0.1');
}

export const stopAudio = (cb) => {
  Tone.getTransport().once('stop', cb);
  Tone.getTransport().stop('8n')
}

export const pauseAudio = () => {
  Tone.Transport.pause('+8n');
}

export const updateTempo = newTempo => {
  const tempo = Math.max(50, Math.min(320, newTempo));
  Tone.getTransport().bpm.rampTo(tempo, 1);
}

const startTone = async () => {
  await Tone.start();
  window.removeEventListener('click', startTone);
  window.removeEventListener('touchstart', startTone);
};

window.addEventListener('click', startTone);
window.addEventListener('touchstart', startTone);
