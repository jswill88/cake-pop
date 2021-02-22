import ButtonLabel from './ButtonLabel'
import { Context } from '../context/context'
import { useContext } from 'react'

import { InlineIcon } from '@iconify/react';
import musicClefTreble from '@iconify-icons/mdi/music-clef-treble';
import musicClefBass from '@iconify-icons/mdi/music-clef-bass';
import drumIcon from '@iconify-icons/la/drum';





import {
  Row,
  Button,
  Divider
} from 'antd'


export default function NoteRow({
  noteRow,
}) {
  const {
    Tone,
    currentBeat,
    NOTES,
    makeSynth,
    loopLength,
    noteSwitches,
    setNoteSwitches
  } = useContext(Context)

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
    <Row
      key={noteRow}
      justify="space-between"
      align="middle"
    >
      <Icon
      noteRow={noteRow}
      />
      {Object.keys(noteSwitches[noteRow]).map((beat, i) =>
        <>
          <Button
            shape="circle"
            onClick={() => {
              const note = getNote(noteRow, i)
              addSynth(beat, note, noteRow)
            }}
            key={beat}
            style={{ overflow: 'hidden' }}
          >
            <ButtonLabel
              beat={noteSwitches[noteRow][beat]}
              active={i === currentBeat}
              note={getNoteName(noteRow, i)}
            />
          </Button>
          {!((parseInt(beat) + 1) % (loopLength / 4)) && ((parseInt(beat) + 1) !== loopLength) &&
            <Divider
              type="vertical"
            />
          }
        </>
      )}
      {['low', 'bassLow', 'bassDrum'].includes(noteRow) && <Divider />}
    </Row>
  )
}

function Icon({noteRow}) {
  switch (noteRow) {
    case 'high':
    case 'low':
    case 'mid':
      return <InlineIcon
        style={{ fontSize: '1.5rem' }}
        icon={musicClefTreble} />
    case 'bassHigh':
    case 'bassLow':
      return <InlineIcon
        style={{ fontSize: '1.5rem' }}
        icon={musicClefBass} />
    case 'bassDrum':
    case 'snareDrum':
    case 'cymbal':
      return <InlineIcon
        style={{ fontSize: '1.5rem' }}
        icon={drumIcon} />
    default:
      return null
  }
}

// make component for each subset of row