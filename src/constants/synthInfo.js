const sharedSettings = {
  chordSynth: {
      volume: 3,
      detune: 0,
      portamento: 0,
      envelope: {
        attack: 0.005,
        attackCurve: 'linear',
        decay: 0.1,
        decayCurve: 'exponential',
        release: 1,
        releaseCurve: 'exponential',
        sustain: 0.3
      },
      oscillator: {
        partialCount: 0,
        partials: [],
        phase: 0,
        type: 'triangle'
    }
  },
  bassSynth: {
    volume: 5,
    detune: 0,
    envelope: {
      attack: 0.005,
      attackCurve: 'linear',
      decay: 0.2,
      decayCurve: 'exponential',
      realease: 1,
      releaseCurve: 'exponential',
      sustain: 0.2,
    },
    oscillator: {
      partialCount: 0,
      partials: [],
      phase: 0,
      type: "amsine",
      harmonicity: .5,
      modulationType: 'sine',
    }
  }
}

export const synthObjs = [
  {
    name: 'high',
    type: 'Synth',
    order: 1,
    noteLength: '8n',
    settings: sharedSettings.chordSynth,
    dynamicPitch: true
  },
  {
    name: 'mid',
    type: 'Synth',
    order: 2,
    noteLength: '8n',
    settings: sharedSettings.chordSynth,
    dynamicPitch: true

  },
  {
    name: 'low',
    type: 'Synth',
    order: 3,
    noteLength: '8n',
    settings: sharedSettings.chordSynth

  },
  {
    name: 'bassHigh',
    type: 'Synth',
    order: 4,
    noteLength: '8n',
    settings: sharedSettings.bassSynth,
    dynamicPitch: true
  },
  {
    name: 'bassLow',
    type: 'Synth',
    order: 5,
    noteLength: '8n',
    settings: sharedSettings.bassSynth,
    dynamicPitch: true
  },
  {
    name: 'cymbal',
    type: 'MetalSynth',
    order: 6,
    noteLength: '8n',
    settings: {
      volume: -10,
    },
    dynamicPitch: false
  },
  {
    name: 'snareDrum',
    type: 'NoiseSynth',
    order: 7,
    noteLength: '8n',
    settings: {
      volume: 3,
      envelope: {
        attack: 0.001,
        attackCurve: 'linear',
        decay: 0.2,
        decayCurve: 'exponential',
        release: 1,
        releaseCurve: 'exponential',
        sustain: 0
      },
      noise: {
        fadeIn: 0,
        fadeOut: 0,
        playbackRate: 1,
        type: "white"
      }
    },
    dynamicPitch: false
  },
  {
    name: 'bassDrum',
    type: 'MembraneSynth',
    order: 8,
    noteLength: '8n',
    settings: {
      volume: 7,
    },
    dynamicPitch: false
  }
]

export const extraTime = .1;

