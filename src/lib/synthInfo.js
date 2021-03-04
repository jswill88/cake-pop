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
    volume: -15,
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
  bassDrum: {
    volume: -5,
  },
  snareDrum:
    {
      volume: -10,
      envelope: {
        "attack": 0.001,
        "attackCurve": "linear",
        "decay": 0.2,
        "decayCurve": "exponential",
        "release": 1,
        "releaseCurve": "exponential",
        "sustain": 0
      },
      "noise": {
        "fadeIn": 0,
        "fadeOut": 0,
        "playbackRate": 1,
        "type": "white"
      }
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