import { synthObjs, extraTime } from "../constants/synthInfo";
import { DEFAULT_LENGTH } from "../constants/loopInfo";
import * as Tone from 'tone';

class Synth {
  constructor({ name, type, order, noteLength, settings, dynamicPitch }) {
    this.name = name;
    this.order = order;
    this.noteLength = noteLength;
    this.dynamicPitch = dynamicPitch;
    this.synth = new Tone[type](settings).connect(new Tone.Gain(.2).toDestination());
    this.sequence = new Tone.Sequence((time, note) => {
      this.synth.triggerAttackRelease(note, noteLength, time + extraTime)
    }, new Array(DEFAULT_LENGTH).fill([])).start(0);
  }

  clearNotes(length) {
    this.sequence.events = new Array(length).fill([]);
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

export const rows = synthObjs.map(obj => new Synth(obj));

export const startAudio = (tempo) => {
  Tone.Transport.bpm.value = tempo;
  Tone.Transport.start('+0.1');
}

export const stopAudio = (cb) => {
  Tone.getTransport().once('stop', cb);
  Tone.getTransport().stop('8n')
}

const startTone = async () => {
  await Tone.start();
  window.removeEventListener('click', startTone);
  window.removeEventListener('touchstart', startTone);
};

window.addEventListener('click', startTone);
window.addEventListener('touchstart', startTone);
