import { useEffect, useState, useRef, useContext } from 'react';
import he from 'he';
import NoteRow from './NoteRow';
import { BASS, CHORDS } from '../lib/noteInfo';
import { Context } from '../context/context';

export default function Synth() {

  const [down, setDown] = useState(false);

  const {
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    loopLength,
    handleTempoChange,
    Tone,
    degrees,
    setDegrees,
    currentBeat,
    setCurrentBeat,
    NOTES,
    makeSynth,
  } = useContext(Context)

  const mousePositions = useRef({});

  useEffect(() => console.log(prog), [prog])

  useEffect(() => {
    const noteObj = {
      high: {}, mid: {}, low: {}, bassHigh: {}, bassLow: {}, cymbal: {}, snareDrum: {}, bassDrum: {}
    }
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
  }, [loopLength, setNoteSwitches, Tone.Draw, Tone.Loop, setCurrentBeat])

  const handleChordChange = (e, i) => {
    const newChord = he.encode(e.target.value);
    setProg(arr => {
      const arrCopy = [...arr]
      arrCopy[i] = newChord;
      return arrCopy;
    });

    const start = i * loopLength / 4;
    const end = start + loopLength / 4
    setNoteSwitches(noteObj => {
      for (let noteRow in noteObj) {

        if (['high', 'mid', 'low', 'bassHigh', 'bassLow'].includes(noteRow)) {
          for (let i = start; i < end; i++) {
            if (noteObj[noteRow][i]) {
              noteObj[noteRow][i].stop();
              noteObj[noteRow][i].cancel();
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
      }
      return noteObj;
    })
  }

  const changeDegree = (e) => {
    if (down) {
      const yPos = e.nativeEvent.y;
      if (!mousePositions.current.bottom) {
        const topDiff = Math.floor(degrees / 2.7);
        const bottomDiff = 100 - topDiff;
        const top = yPos + topDiff;
        const bottom = yPos - bottomDiff;
        mousePositions.current = { bottom, top };
      } else {
        if (yPos <= mousePositions.current.bottom) setDegrees(270);
        else if (yPos >= mousePositions.current.top) setDegrees(0);
        else {
          const pct = (100 - (yPos - mousePositions.current.bottom)) / 100;
          setDegrees(Math.floor(270 * pct));
        }
      }
    }
  };

  const endChanging = () => {
    setDown(false);
    mousePositions.current = {};
    handleTempoChange(degrees + 50)
  };


  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        cursor: !down ? 'auto' : 'ns-resize',
      }}

      onMouseMove={(e) => changeDegree(e)}
      onMouseLeave={() => setDown(false)}
      onMouseUpCapture={() => endChanging()}
      onMouseUp={() => endChanging()}
    >

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
      <div
        id="knob"
        style={{
          height: '100px',
          width: '100px',
          backgroundColor: 'black',
          borderRadius: '50%',
          position: 'relative',
          transform: `rotate(${degrees}deg)`,
        }}
        onMouseDown={(e) => setDown(true)}
        onMouseUp={(e) => endChanging()}
      >
        <div
          id="dot"
          style={{
            height: '7px',
            width: '7px',
            backgroundColor: 'tan',
            borderRadius: '50%',
            position: 'absolute',
            left: '20%',
            bottom: '20%',
          }}
        ></div>
      </div>

      {
        ('high' in noteSwitches) &&
        <>
          {Object.keys(noteSwitches).map(noteRow =>
            <NoteRow
              key={noteRow}
              noteRow={noteRow}
              noteSwitches={noteSwitches}
              currentBeat={currentBeat}
              Tone={Tone}
              setNoteSwitches={setNoteSwitches}
              loopLength={loopLength}
              NOTES={NOTES}
              makeSynth={makeSynth}
            />
          )}
        </>
      }
    </div >
  )
}
