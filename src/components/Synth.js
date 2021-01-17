import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import he from 'he';

export default function Synth() {
  const [noteSwitches, setNoteSwitches] = useState({});
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [prog, setProg] = useState(['I', 'V', 'vi', 'IV'])
  const [loopLength, setLoopLength] = useState(16);

  const CHORDS = {
    I: ['Db', 'F', 'Ab'],
    ii: ['Eb', 'Gb', 'Bb'],
    iii: ['C', 'F', 'Ab'],
    IV: ['Db', 'Gb', 'Bb'],
    V: ['C', 'Eb', 'Ab'],
    vi: ['Db', 'F', 'Bb'],
    'vii&#x26AC;': ['C', 'Eb', 'Gb'],
  }

  const BASS = {
    I: ['Db', 'Ab'],
    ii: ['Eb', 'Bb'],
    iii: ['F', 'C'],
    IV: ['Gb', 'Db'],
    V: ['Ab', 'Eb'],
    vi: ['Bb', 'F'],
    'vii&#x26AC;': ['C', 'Gb'],
  }

  const notes = {
    high: [CHORDS[prog[0]][2], CHORDS[prog[1]][2], CHORDS[prog[2]][2], CHORDS[prog[3]][2]],
    mid: [CHORDS[prog[0]][1], CHORDS[prog[1]][1], CHORDS[prog[2]][1], CHORDS[prog[3]][1]],
    low: [CHORDS[prog[0]][0], CHORDS[prog[1]][0], CHORDS[prog[2]][0], CHORDS[prog[3]][0]],
    bassHigh: [BASS[prog[0]][1], BASS[prog[1]][1], BASS[prog[2]][1], BASS[prog[3]][1]],
    bassLow: [BASS[prog[0]][0], BASS[prog[1]][0], BASS[prog[2]][0], BASS[prog[3]][0]],
  }

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
    const noteObj = { high: {}, mid: {}, low: {}, bassLow: {}, bassHigh: {} }
    for (let note in noteObj) {
      for (let i = 0; i < loopLength; i++) noteObj[note][i] = false;
    }
    setNoteSwitches(noteObj)
    setCurrentBeat(-2)
  }

  useEffect(() => {
    const noteObj = { high: {}, mid: {}, low: {}, bassLow: {}, bassHigh: {} }
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
  }, [loopLength])


  const addSynth = (beat, note, row) => {
    if (!noteSwitches[row][beat]) {
      const arrLoop = new Array(loopLength).fill([])
      arrLoop[beat] = note;
      const synth = makeSynth(row.includes('bass') ? 'bassSynth' : 'chordSynth');
      const loop = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, '8n', time);
      }, arrLoop).start(0);
      setNoteSwitches(obj => ({ ...obj, [row]: { ...obj[row], [beat]: loop } }));
    } else {
      noteSwitches[row][beat].stop();
      setNoteSwitches(obj => ({ ...obj, [row]: { ...obj[row], [beat]: false } }));
    }
  }

  const handleChordChange = (e, i) => {
    const newChord = he.encode(e.target.value);
    setProg(arr => {
      const arrCopy = [...arr]
      arrCopy[i] = newChord;
      return arrCopy;
    });

    let start = i * loopLength / 4;
    const end = start + loopLength / 4
    setNoteSwitches(noteObj => {
      for (let noteRow in noteObj) {
        for (let i = start; i < end; i++) {
          if (noteObj[noteRow][i]) {

            noteObj[noteRow][i].dispose();
            const arrLoop = new Array(loopLength).fill([])
            let note;
            if (['bassLow', 'bassHigh'].includes(noteRow)) {
              note = BASS[newChord][noteRow === 'bassLow' ? 0 : 1] + 3;
            } else {
              note = CHORDS[newChord][2 - Object.keys(notes).indexOf(noteRow)] + 5;
            }

            arrLoop[i] = note;

            const synth = makeSynth(noteRow.includes('bass') ? 'bassSynth' : 'chordSynth');
            noteObj[noteRow][i] = new Tone.Sequence((time, note) => {
              synth.triggerAttackRelease(note, '16n', time);
            }, arrLoop).start(0);
          }
        }
      }
      return noteObj;
    })
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
            onChangeCapture={e => handleChordChange(e, i)}>
            {Object.keys(CHORDS).map((chord, j) =>
              <option
                key={j}
              >{he.decode(chord)}</option>
            )}
          </select>
        )}
      </div>

      <select
        defaultValue={loopLength}
        onChangeCapture={e => {
          reset();
          setLoopLength(parseInt(e.target.value))
        }}
      >
        {[8, 12, 16, 20, 24, 28, 32].map(beats =>
          <option
            key={beats}
          >{beats}</option>
        )}
      </select>

      {/* DON'T MOVE OUT INTO SEPARATE COMPONENTS */}
      {('high' in noteSwitches) &&
        <>
          {Object.keys(notes).map(noteRow =>
            <div
              key={noteRow}
              style={{
                width: '80%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {Object.keys(noteSwitches[noteRow]).map((beat, i) =>
                <button
                  onClick={() => {
                    const note = notes[noteRow][Math.floor(i / loopLength * 4)] + (noteRow.includes('bass') ? 3 : 5)
                    addSynth(beat, note, noteRow)
                  }}
                  key={beat}
                  style={{ margin: '2px' }}
                >
                  <span
                    style={{
                      boxSizing: 'border-box',
                      backgroundColor: noteSwitches[noteRow][beat] === false ? 'pink'
                        : i === currentBeat ? 'white' : 'lightblue',
                      border: i === currentBeat ? '2px solid black' : 'none',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '.9em'
                    }}
                  >
                    {notes[noteRow][Math.floor(i / loopLength * 4)]}
                  </span>
                </button>
              )}
            </div>
          )}
        </>
      }

      <button
        onClick={() => reset()}
      >Reset</button>
    </div >
  )
}

const SYNTHS = {
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

}


function makeSynth(type) {
  return new Tone.Synth(SYNTHS[type]).toDestination();
}
// function makeDrums() {
  // Metal Synth
  // Membrane Synth
// }