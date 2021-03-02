import { Context } from '../context/context'
import { useContext } from 'react'
import { InlineIcon } from '@iconify/react';
import he from 'he';
import { CHORDS } from '../lib/noteInfo';
import musicClefTreble from '@iconify-icons/mdi/music-clef-treble';
import musicClefBass from '@iconify-icons/mdi/music-clef-bass';
import drumIcon from '@iconify-icons/la/drum';

import Row from 'antd/es/row';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Select from 'antd/es/select'

const { Option } = Select;


export default function NoteColumns() {
  const {
    currentBeat,
    NOTES,
    loopLength,
    noteSwitches,
    buttons,
    setButtons,
    handleChordChange,
    prog,
    isMobile
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
      note = NOTES[noteRow][Math.floor(i / loopLength * 4)] + (noteRow.includes('bass') ? '' : 5);
    }
    return note;
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
      {('high' in noteSwitches) &&
        <Row
          justify="space-around"
          gutter={[{ xs: 0, sm: 24 }, 18]}
        >


          {[0, 1, 2, 3].map(i =>
            < Col
              key={i}
              xs={loopLength <= 12 ? 12 :  24}
              sm={loopLength <= 8 ? 6 :  12}
              md={loopLength <= 12 ? 6 :  12}
              lg={6}
              style={{
                // minWidth: '13rem',
                boxSizing: 'border-box',
                borderRadius: '3%',
              }}
            >
              <Card
                title={<Select
                  value={he.decode(prog[i])}
                  onChange={val => handleChordChange(val, i)}
                  size={isMobile ? "middle" : "small"}
                  style={{ minWidth: '2.5rem' }}
                >
                  {CHORDS && Object.keys(CHORDS).map((chord, j) =>
                    <Option
                      key={j}
                      value={chord}
                    >{he.decode(chord)}</Option>
                  )}
                </Select>}
              >
                
                {Object.keys(noteSwitches).map((noteRow, j) =>
                  <Row
                    key={j}
                    justify="space-around"
                    gutter={16}
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
                          border: String(beat) === String(currentBeat) ? '1px solid black' : '1px solid lightblue',
                          alignItems: 'center',
                          justifyContent: 'center',
                          display: 'flex',
                          margin: '.2rem 0',
                          boxShadow: '1px 1px 1px #25173880'
                        }}
                        size="middle"
                        type={!buttons[noteRow][beat] ? 'ghost'
                          : String(beat) === String(currentBeat) ? 'default' : 'primary'}
                      >
                        <Icon noteRow={noteRow} />

                      </Button>

                    )}
                    {['low', 'bassLow'].includes(noteRow) && <Divider />}
                  </Row>
                )}
              </Card>
            </Col>
          )}

          {/* </Space> */}
        </Row>
      }
    </>
  )
}



function Icon({ noteRow }) {
  switch (noteRow) {
    case 'high':
    case 'low':
    case 'mid':
      return <InlineIcon
        style={{ fontSize: '1.2rem' }}
        icon={musicClefTreble} />
    case 'bassHigh':
    case 'bassLow':
      return <InlineIcon
        style={{ fontSize: '1.2rem' }}
        icon={musicClefBass} />
    case 'bassDrum':
    case 'snareDrum':
    case 'cymbal':
      return <InlineIcon
        style={{ fontSize: '1.2rem' }}
        icon={drumIcon} />
    default:
      return null
  }
}