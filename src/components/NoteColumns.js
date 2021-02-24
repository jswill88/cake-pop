import ButtonLabel from './ButtonLabel'
import { Context } from '../context/context'
import { useContext } from 'react'
import { Row, Button, Divider, Col } from 'antd';

export default function NoteColumns() {
  const {
    currentBeat,
    NOTES,
    loopLength,
    noteSwitches,
    buttons,
    setButtons
  } = useContext(Context)

  const addSynth = (beat, note, row) => {
    if (!noteSwitches[row].events[beat].length) {

      noteSwitches[row].events[beat] = note;
      setButtons(obj => {
        obj[row][beat] = true;
        return { ...obj };
      })
    } else {
      noteSwitches[row].events[beat] = []
      setButtons(obj => {
        obj[row][beat] = false;
        return { ...obj };
      })
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


  const chordLength = i => {
    let start = i * loopLength / 4;
    const end = start + loopLength / 4;
    const chordLength = [];
    for (; start < end; start++) chordLength.push(start)
    return chordLength
  }

  return (
    <>
      {[0, 1, 2, 3].map(i =>
        < Col
          key={i}
          style={{
            marginBottom: '1rem',
          }}
        >
          {Object.keys(noteSwitches).map((noteRow, j) =>
            <Row
              key={j}
            >
              {chordLength(i).map(beat =>
                <Button
                  shape="circle"
                  onClick={() => {
                    const note = getNote(noteRow, beat)
                    addSynth(beat, note, noteRow)
                  }}
                  key={beat}
                  style={{ overflow: 'hidden' }}
                >

                  <ButtonLabel
                    beat={buttons[noteRow][beat]}
                    active={String(beat) === String(currentBeat)}
                    note={getNoteName(noteRow, beat)}
                  />

                </Button>
              )}
              {['low', 'bassLow'].includes(noteRow) && <Divider />}
            </Row>
          )}
        </Col>
      )}
    </>
  )
}