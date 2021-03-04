export const SYNTHS = {
  chordSynth: {
    // volume: -10,
    // detune: 0,
    // // portamento: 0.05,
    // envelope: {
    //   attack: 0.05,
    //   attackCurve: 'exponential',
    //   decay: 0.2,
    //   decayCurve: 'exponential',
    //   release: .5,
    //   releaseCurve: 'exponential',
    //   sustain: 0.2,
    // },
    // oscillator: {
    //   partialCount: 0,
    //   partials: [],
    //   phase: 0,
    //   type: 'amsine',
    //   harmonicity: 0.5,
    //   modulationType: 'sawtooth',
    // }
    
      volume: -17,
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
    volume: -15,
    detune: 0,
    envelope: {
      attack: 0.005,
      attackCurve: 'linear',
      // attackCurve: 'exponential',
      decay: 0.2,
      decayCurve: 'exponential',
      // release: 1.5,
      realease: 1,
      releaseCurve: 'exponential',
      sustain: 0.2,
    },
    oscillator: {
      partialCount: 0,
      partials: [],
      phase: 0,
      // type: 'amtriangle',
      type: "amsine",
      harmonicity: .5,
      modulationType: 'sine',
    }
  },
  bassDrum: {
    volume: -15,
  },
  snareDrum:
    {
      volume: -15,
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
  cymbal: {
    volume: -40,
  },
}

export const synthTypes = {
  bassSynth: 'Synth',
  chordSynth: 'Synth',
  bassDrum: 'MembraneSynth',
  snareDrum: 'NoiseSynth',
  cymbal: 'MetalSynth',
}