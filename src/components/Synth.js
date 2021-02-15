import { useEffect, useState, useRef, useContext } from 'react';
import he from 'he';
import NoteRow from './NoteRow';
import PrimaryButtons from './PrimaryButtons';
import { BASS, CHORDS } from '../lib/noteInfo';
import { Context } from '../context/context';


export default function Synth() {

  const [down, setDown] = useState(false);
  const [showTempoInput, setShowTempoInput] = useState(false);

  const {
    songs,
    loggedIn,
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    loopLength,
    setLoopLength,
    tempo,
    // setTempo,
    open,
    handleTempoChange,
    Tone,
    degrees,
    setDegrees,
    title,
    setTitle,
    currentBeat,
    setCurrentBeat,
    reset,
    NOTES,
    makeSynth,
  } = useContext(Context)


  const titleForm = useRef(title)
  const mousePositions = useRef({});
  const dynaTempo = useRef(120)


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

      <PrimaryButtons
        Tone={Tone}
        setCurrentBeat={setCurrentBeat}
        tempo={tempo}
        reset={reset}
      />

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
      {loggedIn &&
        <>
          <label>Your Songs: </label>
          <select
            onChange={(e) => open(e.target.value)}
          >
            {songs.map(({ title, id }, i) =>
              <option
                key={i}
                value={id}
              >
                {title}

              </option>
            )}

          </select>
        </>
      }
      <label>Number of beats:{' '}
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
      </label>
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

      <label>Title:</label>
      <form
        onSubmit={e => {
          e.preventDefault();
          setTitle(titleForm.current);
        }}
      >
        <input
          type="text"
          defaultValue={title}
          onChange={e => titleForm.current = e.target.value}
        />
        <button type="submit">Rename</button>
      </form>

      <span>
        Tempo:{' '}
      </span>
      {showTempoInput ?
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleTempoChange(dynaTempo.current)
              setDegrees(dynaTempo.current - 50)
              setShowTempoInput(false);
            }}
          >
            <input
              type="number"
              min={50}
              max={320}
              defaultValue={tempo}
              onChangeCapture={e => {
                dynaTempo.current = e.target.value
              }}
            />
            <input
              type="submit"
              value="Set"
            />
          </form>
        </> :
        <span
          onClick={() => setShowTempoInput(true)}
          style={{ border: '1px solid black', width: '50px', textAlign: 'center' }}
        >
          {degrees + 50}
        </span>
      }

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
