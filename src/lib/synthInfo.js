export const SYNTHS = {
  chordSynth: {
    volume: -10,
    detune: 0,
    portamento: 0.05,
    envelope: {
      attack: 0.05,
      attackCurve: 'exponential',
      decay: 0.2,
      decayCurve: 'exponential',
      release: 1,
      releaseCurve: 'exponential',
      sustain: 0.2,
    },
    oscillator: {
      partialCount: 0,
      partials: [],
      phase: 0,
      type: 'amsine',
      harmonicity: 0.5,
      modulationType: 'sawtooth',
    }
  },
  bassSynth: {
    volume: -5,
    detune: 0,
    portamento: 0.05,
    envelope: {
      attack: 0.05,
      attackCurve: 'exponential',
      decay: 0.2,
      decayCurve: 'exponential',
      release: 1.5,
      releaseCurve: 'exponential',
      sustain: 0.2,
    },
    oscillator: {
      partialCount: 0,
      partials: [],
      phase: 0,
      type: 'amtriangle',
      harmonicity: .5,
      modulationType: 'sine',
    }
  },
  bassDrum: {},
  snareDrum: {
    volume: -5,
  },
  cymbal: {
    volume: -25,
  },
}

export const synthTypes = {
  bassSynth: 'Synth',
  chordSynth: 'Synth',
  bassDrum: 'MembraneSynth',
  snareDrum: 'NoiseSynth',
  cymbal: 'MetalSynth',
}