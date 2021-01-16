import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import he from 'he';


// see line 154 to fix chord

export default function Synth() {
  const [noteSwitches, setNoteSwitches] = useState({});
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [prog, setProg] = useState(['I', 'V', 'vi', 'IV'])

  const loopLength = 16;



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
    low: [CHORDS[prog[0]][0], CHORDS[prog[1]][0], CHORDS[prog[2]][0], CHORDS[prog[3]][0]],
    mid: [CHORDS[prog[0]][1], CHORDS[prog[1]][1], CHORDS[prog[2]][1], CHORDS[prog[3]][1]],
    high: [CHORDS[prog[0]][2], CHORDS[prog[1]][2], CHORDS[prog[2]][2], CHORDS[prog[3]][2]],
    bassLow: [BASS[prog[0]][0], BASS[prog[1]][0], BASS[prog[2]][0], BASS[prog[3]][0]],
    bassHigh: [BASS[prog[0]][1], BASS[prog[1]][1], BASS[prog[2]][1], BASS[prog[3]][1]],
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
          console.log(noteSwitches[loop][i])
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
  }, [])


  const addSynth = (beat, note, row, newChord = false) => {
    if (!noteSwitches[row][beat] || newChord) {
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

  const NoteButtons = ({ noteRow, octave }) => {
    // console.log(noteSwitches[noteRow])
    return (
      <div
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
            onClick={() => addSynth(beat, notes[noteRow][Math.floor(i / loopLength * 4)] + octave, noteRow)}
          >
            {notes[noteRow][Math.floor(i / loopLength * 4)]}
          </span>
        )}
      </div>
    )
  }

  const handleChordChange = (e, i) => {
    setProg(arr => {
      const arrCopy = [...arr]
      arrCopy[i] = he.encode(e.target.value);
      return arrCopy;
    });

    let start = i * loopLength / 4;
    const end = start + loopLength / 4
    setNoteSwitches(noteObj => {
      for (let noteRow in noteObj) {
        for (let i = start; i < end; i++) {
          if (noteObj[noteRow][i]) {
            console.log('in chord change loop', noteObj[noteRow][i])
            noteObj[noteRow][i].dispose();
            const arrLoop = new Array(loopLength).fill([])

            // fix this to get the correct note
            arrLoop[i] = 'F#5';

            const synth = makeSynth();
            noteObj[noteRow][i] = new Tone.Sequence((time, note) => {
              synth.triggerAttackRelease(note, '8n', time);
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

      {('high' in noteSwitches) &&
        <>
          <div id="chords">
            <NoteButtons noteRow="high" octave="5" />
            <NoteButtons noteRow="mid" octave="5" />
            <NoteButtons noteRow="low" octave="5" />
          </div>
          <div id="bass">
            <NoteButtons noteRow="bassHigh" octave="3" />
            <NoteButtons noteRow="bassLow" octave="3" />
          </div>
        </>
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