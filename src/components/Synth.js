import { useEffect, useState } from 'react';
import * as Tone from 'tone';


export default function Synth() {
  const [loop1Arr, setLoop1Arr] = useState({});
  const [currentBeat, setCurrentBeat] = useState(-1)

  const loopLength = 32;

  const startAudio = async () => {
    setCurrentBeat(-1)
    await Tone.start();
    Tone.Transport.start('+0.1');
  }

  const reset = () => {
    for (let loop in loop1Arr) {
      for (let i = 0; i < loopLength; i++) {
        if (loop1Arr[loop][i]) {
          loop1Arr[loop][i].stop()
        }
      }
    }
    Tone.Transport.stop();
    const noteObj = { Ab5: {}, G5: {}, F5: {}, Eb5: {}, Db5: {}, C5: {}, Bb4: {}, Ab4: {} }
    for (let note in noteObj) {
      for (let i = 0; i < loopLength; i++) noteObj[note][i] = false;
    }
    setLoop1Arr(noteObj)
    setCurrentBeat(-1)
  }

  useEffect(() => {
    const noteObj = { Ab5: {}, G5: {}, F5: {}, Eb5: {}, Db5: {}, C5: {}, Bb4: {}, Ab4: {} }
    for (let note in noteObj) {
      for (let i = 0; i < loopLength; i++) noteObj[note][i] = false;
    }
    setLoop1Arr(noteObj)

    const loop = new Tone.Loop(time => {
      Tone.Draw.schedule(() => {
        setCurrentBeat(beat => (beat + 1) % loopLength)
      }, time)
    }, '8n').start(0);
    return () => loop.cancel();
  }, [])


  const addSynth = (beat, note) => {
    if (!loop1Arr[note][beat]) {
      const arrLoop = new Array(loopLength).fill([])
      arrLoop[beat] = note;
      const synth = makeSynth();
      const loop = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, '8n', time);
      }, arrLoop).start(0);
      setLoop1Arr(obj => ({ ...obj, [note]: { ...obj[note], [beat]: loop } }));
    } else {
      loop1Arr[note][beat].stop();
      setLoop1Arr(obj => ({ ...obj, [note]: { ...obj[note], [beat]: false } }));
    }
  }

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <section>
        <h1
          onClick={() => {
            startAudio()
          }}
          style={{ border: '2px solid black', width: '100px', color: 'limegreen', textAlign: 'center' }}
        >Start</h1>
        <h1
          onClick={() => {
            Tone.Transport.stop()
            setCurrentBeat(-2);
          }}
          style={{ border: '2px solid black', width: 100, color: 'red', textAlign: 'center' }}
        >Stop</h1>
      </section>
      {Object.keys(loop1Arr).map(note =>
        <div
          key={note}
          style={{
            width: '95%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {Object.keys(loop1Arr[note]).map((beat, i) =>
            <span
              key={beat}
              style={{
                boxSizing: 'border-box',
                backgroundColor: loop1Arr[note][beat] === false ? 'pink'
                  : i === currentBeat ? 'yellow' : 'lightblue',
                border: i === currentBeat ? '2px solid black' : 'none',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '2px',
                borderRadius:'50%',
                fontSize: '.9em'
              }}
              onClick={() => addSynth(beat, note)}
            >{note.slice(0, note.length - 1)}
            </span>
          )}
        </div>
      )}
      <button
        onClick={() => reset()}
      >Reset</button>
    </div>
  )
}

function makeSynth() {
  return new Tone.Synth({
    volume: 0,
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
      harmonicity: 0.5,
      modulationType: 'sine',
    }
  }).toDestination();
}