import ButtonLabel from './ButtonLabel'
import { Context } from '../context/context'
import { useContext } from 'react'


export default function NoteRow({
  noteRow,
  noteSwitches,
  currentBeat,
  setNoteSwitches,
  loopLength,
  makeSynth,
  NOTES
}) {
  const { Tone } = useContext(Context)

  const addSynth = (beat, note, row) => {
    if (!noteSwitches[row][beat]) {

      const arrLoop = new Array(loopLength).fill([])
      arrLoop[beat] = note;

      let type;
      if (['bassHigh', 'bassLow'].includes(row)) type = 'bassSynth'
      else if (['high', 'mid', 'low'].includes(row)) type = 'chordSynth'
      else type = row;
      const synth = makeSynth(type);

      const loop = new Tone.Sequence((time, note) => {
        if (type === 'snareDrum') synth.triggerAttackRelease('8n', time)
        else synth.triggerAttackRelease(note, '8n', time)
      }, arrLoop).start(0);
      setNoteSwitches(obj => ({ ...obj, [row]: { ...obj[row], [beat]: loop } }));
    } else {
      noteSwitches[row][beat].stop();
      noteSwitches[row][beat].cancel();
      setNoteSwitches(obj => ({ ...obj, [row]: { ...obj[row], [beat]: false } }));
    }
  }

  const getNote = (noteRow, i) => {
    let note;
    if (['bassDrum', 'snareDrum', 'cymbal'].includes(noteRow)) {
      note = NOTES[noteRow][Math.floor(i / loopLength * 4)];
    } else {
      note = NOTES[noteRow][Math.floor(i / loopLength * 4)] + (noteRow.includes('bass') ? 3 : 5);
    }
    return note;
  }

  const getNoteName = (noteRow, i) => {
    let noteName;
    if (['bassDrum', 'snareDrum', 'cymbal'].includes(noteRow)) {
      noteName = noteRow[0].toUpperCase() + (noteRow === 'cymbal' ? '' : 'D');
    } else {
      noteName = NOTES[noteRow][Math.floor(i / loopLength * 4)]
    }
    return noteName;
  }



  return (
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
            const note = getNote(noteRow, i)
            addSynth(beat, note, noteRow)
          }}
          key={beat}
          style={{ margin: '2px' }}
        >
          <ButtonLabel
            beat={noteSwitches[noteRow][beat]}
            active={i === currentBeat}
            note={getNoteName(noteRow, i)}
          />
        </button>
      )}
    </div>
  )
}