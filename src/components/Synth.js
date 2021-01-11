import { useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';

// const audioC ontext = new AudioContext()

export default function Synth() {
  const [showDiv, setShowDiv] = useState(false)
  // const [started, setStarted] = useState(false)
  const [loop1Arr, setLoop1Arr] = useState({});
  const noteToAdd = useRef('')

  const startAudio = async () => {
    await Tone.start();
    Tone.Transport.start('+0.1');
  }

  const reset = () => {
    for (let loop in loop1Arr) {
      for (let i = 0; i < 16; i++) {
        if (loop1Arr[loop][i]) {
          loop1Arr[loop][i].stop()
        }
      }
    }
    const noteObj = { Ab5: {}, G5: {}, F5: {}, Eb5: {}, Db5: {}, C5: {}, Bb4: {}, Ab4: {} }
    for (let note in noteObj) {
      for (let i = 0; i < 16; i++) noteObj[note][i] = false;
    }
    setLoop1Arr(noteObj)

  }
  useEffect(() => {
    reset();
  },[])

  const addSynth = (beat, note) => {
    if (!loop1Arr[note][beat]) {
      const arrLoop = new Array(16).fill([])
      arrLoop[beat] = note;
      console.log(arrLoop)
      console.log('in add synth')
      const synth = makeSynth();
      const loop = new Tone.Sequence((time, note) => {
        console.log('time', time)
        synth.triggerAttackRelease(note, '16n', time);
      }, arrLoop).start(0);
      setLoop1Arr(obj => ({ ...obj, [note]: { ...obj[note], [beat]: loop } }));
    } else {
      // console.log
      loop1Arr[note][beat].stop();
      setLoop1Arr(obj => ({ ...obj, [note]: { ...obj[note], [beat]: false } }));
    }
  }

  return (
    <>
      <h1
        onClick={() => {
          startAudio()
          setShowDiv(true)
        }}
        style={{ border: '2px solid black', width: '100px' }}
      >Start</h1>
      <input
        type="text"
        onChange={(e) => noteToAdd.current = e.target.value}
      />
      {Object.keys(loop1Arr).map(note =>
        <div
          key={note}
        >
          {Object.keys(loop1Arr[note]).map(beat =>
            <button
            key={beat}
              style={{
                backgroundColor: loop1Arr[note][beat] === false ? 'pink' : 'lightblue',
                width: '40px'
              }}
              onClick={() => addSynth(beat, note)}
            >{note}</button>
          )}
        </div>
      )}


      {showDiv && <div
        onClick={() => {
          Tone.Transport.stop()
          setShowDiv(false);
        }}
        style={{ border: '3px dotted red', width: 100 }}
      >Stop</div>}

      <button
        onClick={() => reset()}
      >Reset</button>
    </>
  )
}

function makeSynth() {
  return new Tone.Synth({
    volume: 0,
    detune: 0,
    portamento: 0.05,
    envelope: {
      attack: 0.05,
      attackCurve: "exponential",
      decay: 0.2,
      decayCurve: "exponential",
      release: 1.5,
      releaseCurve: "exponential",
      sustain: 0.2
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