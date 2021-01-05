import { useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';

export default function Synth() {
  const [showDiv, setShowDiv] = useState(false)
  const [started, setStarted] = useState(false)
  const [loop1Arr, setLoop1Arr] = useState([])
  const noteToAdd = useRef('')

  const startAudio = async () => {
    await Tone.start();
    Tone.setContext(new Tone.Context({ latencyHint : "playback" }));
    setStarted(true)
    Tone.Transport.start('+0.1');
  }
  useEffect(() => {
    const synth = makeSynth();
    const synth2 = new Tone.FMSynth().toDestination();
    const loop = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, '16n', time);
    }, loop1Arr).start(0);
    const loop2 = new Tone.Sequence((time, note) => {
      synth2.triggerAttackRelease(note, '16n', time);
    }, ['F3', [],'F3',[]]).start(0);
    return () => {
      loop.cancel()
      loop2.cancel();
    }

  }, [started, loop1Arr])

  return (
    <>
      <h1
        onClick={() => {
          startAudio()
          setShowDiv(true)
        }}
      >Synth</h1>
      <input
      type="text"
      onChange={(e) => noteToAdd.current = e.target.value}
      />
      <button
      onClick={() => {
        console.log(noteToAdd.current)
        setLoop1Arr(arr => [...arr, noteToAdd.current])}}
      ></button>
      {showDiv && <div
      onClick={() => {
        Tone.Transport.stop()
        setShowDiv(false);
      }}
      >Click Work</div>}
    </>
  )
}

function makeSynth() {
  return new Tone.Synth({
    "volume": 0,
    "detune": 0,
    "portamento": 0.05,
    "envelope": {
      "attack": 0.05,
      "attackCurve": "exponential",
      "decay": 0.2,
      "decayCurve": "exponential",
      "release": 1.5,
      "releaseCurve": "exponential",
      "sustain": 0.2
    },
    "oscillator": {
      "partialCount": 0,
      "partials": [],
      "phase": 0,
      "type": "amtriangle",
      "harmonicity": 0.5,
      "modulationType": "sine"
    }
  }).toDestination();
}