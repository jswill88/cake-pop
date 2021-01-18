import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import he from 'he';
import ButtonLabel from './ButtonLabel'
import { BASS, CHORDS } from '../lib/noteInfo'
import { SYNTHS, synthTypes} from '../lib/synthInfo'

export default function Synth() {
  const [noteSwitches, setNoteSwitches] = useState({});
  const [drumSwitches, setDrumSwitches] = useState({});
  const [drumSynths, setDrumSynths] = useState({});
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [prog, setProg] = useState(['I', 'V', 'vi', 'IV'])
  const [loopLength, setLoopLength] = useState(16);

  const NOTES = {
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
    setDrumSwitches(drumObj => {
      for (let drum in drumObj) {
        drumObj[drum] = new Array(loopLength).fill(false);
      }
      return drumObj;
    })
  }

  useEffect(() => {
    const noteObj = { high: {}, mid: {}, low: {}, bassLow: {}, bassHigh: {} }
    for (let note in noteObj) {
      for (let i = 0; i < loopLength; i++) noteObj[note][i] = false;
    }
    setNoteSwitches(noteObj)

    const drumTypes = ['snareDrum', 'bassDrum', 'cymbal']
    const drumObj = {};
    const newDrumSynths = {}
    drumTypes.forEach(drum => {
      drumObj[drum] = new Array(loopLength).fill(false);
      newDrumSynths[drum] = makeSynth(drum)
    });

    setDrumSwitches(drumObj);
    setDrumSynths(newDrumSynths);

    const loop = new Tone.Loop(time => {
      Tone.Draw.schedule(() => {
        setCurrentBeat(beat => (beat + 1) % loopLength)
      }, time)
    }, '8n').start(0);

    return () => loop.cancel();
  }, [loopLength])

  useEffect(() => {
    // make sure this only happens once
    if ('bassDrum' in drumSwitches && 'bassDrum' in drumSynths) {
      const drumArray = []
      for (let i = 0; i < loopLength; i++) {
        drumArray.push(i)
      }
      console.log(drumArray)
      const drumLoop = new Tone.Sequence((time, i) => {
        for (let drum in drumSynths) {
          if (drumSwitches[drum][i])
            if (drum !== 'snareDrum') {
              drumSynths[drum].triggerAttackRelease('C1', '8n', time);
            } else {
              drumSynths[drum].triggerAttackRelease('8n', time);
            }
        }

      }, drumArray).start(0);

      return () => drumLoop.cancel();

    }

  }, [drumSwitches, drumSynths, loopLength])


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

  const addDrum = (beat, drum) => {
    if (!drumSwitches[drum][beat]) {
      setDrumSwitches(drumObj => {
        drumObj[drum][beat] = true;
        return drumObj;
      })
    } else {
      setDrumSwitches(drumObj => {
        drumObj[drum][beat] = false;
        return drumObj;
      })
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
              note = CHORDS[newChord][2 - Object.keys(NOTES).indexOf(noteRow)] + 5;
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

      {('high' in noteSwitches && 'bassDrum' in drumSwitches) &&
        <>
          {Object.keys(NOTES).map(noteRow =>
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
                    const note = NOTES[noteRow][Math.floor(i / loopLength * 4)] + (noteRow.includes('bass') ? 3 : 5)
                    addSynth(beat, note, noteRow)
                  }}
                  key={beat}
                  style={{ margin: '2px' }}
                >
                  <ButtonLabel
                    beat={noteSwitches[noteRow][beat]}
                    active={i === currentBeat}
                    note={NOTES[noteRow][Math.floor(i / loopLength * 4)]}
                  />
                </button>
              )}
            </div>
          )}
          {['bassDrum', 'snareDrum', 'cymbal'].map(drum =>
            <div
              key={drum}
              style={{
                width: '80%',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              {drumSwitches.cymbal.map((beat, i) =>
                <button
                  key={i}
                  style={{ margin: '2px' }}
                  onClick={() => {
                    addDrum(i, drum)
                  }}
                ><ButtonLabel
                    beat={drumSwitches[drum][i]}
                    active={i === currentBeat}
                    note={'drum'}
                  /></button>
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

function makeSynth(type) {
  return new Tone[synthTypes[type]](SYNTHS[type]).toDestination();
}
