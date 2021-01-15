import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import he from 'he';


export default function Synth() {
  const [noteSwitches, setNoteSwitches] = useState({});
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [prog, setProg] = useState(['I', 'V', 'vi', 'IV'])

  const loopLength = 32;
  const chords = {
    I: ['Ab4', 'C5', 'Eb5'],
    ii: ['Bb4', 'Db5', 'F5'],
    iii: ['G4', 'C5', 'Eb5'],
    IV: ['Ab4', 'Db5', 'F5'],
    V: ['G4', 'Bb4', 'Eb5'],
    vi: ['Ab4', 'C5', 'F5'],
    'vii&#x26AC;': ['G5', 'Bb4', 'Db5'],
  }

  const notes = {
    low: [chords[prog[0]][0], chords[prog[1]][0], chords[prog[2]][0], chords[prog[3]][0]],
    mid: [chords[prog[0]][1], chords[prog[1]][1], chords[prog[2]][1], chords[prog[3]][1]],
    high: [chords[prog[0]][2], chords[prog[1]][2], chords[prog[2]][2], chords[prog[3]][2]]
  }

  useEffect(() => {
    console.log(prog)
  }, [prog])



  const startAudio = async () => {
    setCurrentBeat(-1)
    await Tone.start();
    Tone.Transport.start('+0.1');
  }

  const reset = () => {
    for (let loop in noteSwitches) {
      for (let i = 0; i < loopLength; i++) {
        if (noteSwitches[loop][i]) {
          noteSwitches[loop][i].stop()
        }
      }
    }
    Tone.Transport.stop();
    const noteObj = { high: {}, mid: {}, low: {} }
    for (let note in noteObj) {
      for (let i = 0; i < loopLength; i++) noteObj[note][i] = false;
    }
    setNoteSwitches(noteObj)
    setCurrentBeat(-2)
  }

  useEffect(() => {
    const noteObj = { high: {}, mid: {}, low: {} }
    for (let note in noteObj) {
      for (let i = 0; i < loopLength; i++) noteObj[note][i] = false;
    }
    setNoteSwitches(noteObj)

    const loop = new Tone.Loop(time => {
      Tone.Draw.schedule(() => {
        setCurrentBeat(beat => (beat + 1) % loopLength)
      }, time)
    }, '8n').start(0);
    return () => loop.cancel();
  }, [])


  const addSynth = (beat, note, row) => {
    if (!noteSwitches[row][beat]) {
      const arrLoop = new Array(loopLength).fill([])
      arrLoop[beat] = note;
      const synth = makeSynth();
      const loop = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, '8n', time);
      }, arrLoop).start(0);
      setNoteSwitches(obj => ({ ...obj, [row]: { ...obj[row], [beat]: loop } }));
    } else {
      noteSwitches[row][beat].stop();
      setNoteSwitches(obj => ({ ...obj, [row]: { ...obj[row], [beat]: false } }));
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

      <div style={{ display: 'flex' }}>
        {prog.map((progChord, i) =>
          <select
            key={i}
            defaultValue={he.decode(progChord)}
            onChangeCapture={e => {
              setProg(arr => {
                const arrCopy = [...arr]
                console.log(he.encode(e.target.value))
                arrCopy[i] = he.encode(e.target.value);
                return arrCopy;
              })
            }}>
            {Object.keys(chords).map((chord, j) =>
              <option
                key={j}
                
              >{he.decode(chord)}</option>
            )}
          </select>
        )}
      </div>

      {
        Object.keys(noteSwitches).map(noteRow =>
          <div
            key={noteRow}
            style={{
              width: '95%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {Object.keys(noteSwitches[noteRow]).map((beat, i) =>
              <span
                key={beat}
                style={{
                  boxSizing: 'border-box',
                  backgroundColor: noteSwitches[noteRow][beat] === false ? 'pink'
                    : i === currentBeat ? 'yellow' : 'lightblue',
                  border: i === currentBeat ? '2px solid black' : 'none',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '2px',
                  borderRadius: '50%',
                  fontSize: '.9em'
                }}
                onClick={() => addSynth(beat, notes[noteRow][Math.floor(i / loopLength * 4)], noteRow)}
              >
                {notes[noteRow][Math.floor(i / loopLength * 4)].slice(0, notes[noteRow][Math.floor(i / loopLength * 4)].length - 1)}
              </span>
            )}
          </div>
        )
      }
      <button
        onClick={() => reset()}
      >Reset</button>
    </div >
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