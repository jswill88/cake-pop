import { Context } from '../context/context'
import { useContext } from 'react'
import { InlineIcon } from '@iconify/react';
import musicClefTreble from '@iconify-icons/mdi/music-clef-treble';
import musicClefBass from '@iconify-icons/mdi/music-clef-bass';
import drumIcon from '@iconify-icons/la/drum';

import Row from 'antd/es/row';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import Col from 'antd/es/col';

export default function NoteColumns() {
  const {
    currentBeat,
    NOTES,
    loopLength,
    noteSwitches,
    buttons,
    setButtons,
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

  // const getNoteName = (noteRow, i) => {
  //   let noteName;
  //   if (['bassDrum', 'snareDrum', 'cymbal'].includes(noteRow)) {
  //     noteName = noteRow[0].toUpperCase() + (noteRow === 'cymbal' ? '' : 'D');
  //   } else {
  //     noteName = NOTES[noteRow][Math.floor(i / loopLength * 4)]
  //   }
  //   return noteName;
  // }


  const chordLength = i => {
    let start = i * loopLength / 4;
    const end = start + loopLength / 4;
    const chordLength = [];
    for (; start < end; start++) chordLength.push(start)
    return chordLength
  }

  return (
    <>
      {('high' in noteSwitches) &&
        <Row
          justify="center"
        >
         
          {[0, 1, 2, 3].map(i =>
              < Col
                key={i}
                style={{
                  marginBottom: '1rem',
                  // width: '20%',
                  minWidth: '20%',
                  padding: '2rem 0',
                  boxSizing:'border-box',
                  border: chordLength(i).includes(currentBeat) ? '2px solid black' : '2px solid lightblue',
                }}
              >
                {/* <Title
                level={5}
                style={{textAlign: 'center'}}
                >{he.decode(prog[i])}</Title> */}
                {Object.keys(noteSwitches).map((noteRow, j) =>
                  <Row
                    key={j}
                    justify="space-around"
                  >
                    {chordLength(i).map(beat =>
                      <Button
                        shape="circle"
                        onClick={() => {
                          const note = getNote(noteRow, beat)
                          addSynth(beat, note, noteRow)
                        }}
                        key={beat}
                        style={{
                        overflow: 'hidden',
                        border: String(beat) === String(currentBeat) && '1px solid black',
                        // transitionDuration: '.1s',
                      }}
                        type={!buttons[noteRow][beat] ? 'link'
                        : String(beat) === String(currentBeat) ? 'default' : 'primary'}
                      >
                        <Icon noteRow={noteRow} />
                        {/* <ButtonLabel
                          beat={buttons[noteRow][beat]}
                          active={String(beat) === String(currentBeat)}
                          note={getNoteName(noteRow, beat)}
                          noteRow={noteRow}
                        /> */}

                      </Button>
                    )}
                    {['low', 'bassLow'].includes(noteRow) && <Divider />}
                  </Row>
                )}
              </Col>
       
          )}
        </Row>
      }
    </>
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