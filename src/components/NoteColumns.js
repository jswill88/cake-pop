import { Context } from '../context/context'
import { useContext } from 'react'
import { InlineIcon } from '@iconify/react';
import he from 'he';
import { CHORDS } from '../constants/noteInfo';
import colors from '../constants/colors'
import musicClefBass from '@iconify-icons/mdi/music-clef-bass';
import drumIcon from '@iconify-icons/la/drum';

import Row from 'antd/es/row';
import Button from 'antd/es/button';
import Divider from 'antd/es/divider';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Select from 'antd/es/select'

import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2398042_9b3z0yk2zqe.js',
});

const { Option } = Select;


export default function NoteColumns() {
  const {
    currentBeat,
    notes,
    loopLength,
    buttons,
    rows,
    updateButtons
  } = useContext(Context)

  const toggleNote = (beat, note, synth) => {
    synth.toggleNote(beat, note);
    updateButtons();
  }

  const getNote = (noteRow, i) => {
    let note;
    if (['bassDrum', 'snareDrum', 'cymbal'].includes(noteRow)) {
      note = notes[noteRow][Math.floor(i / loopLength * 4)];
    } else {
      note = notes[noteRow][Math.floor(i / loopLength * 4)] + (noteRow.includes('bass') ? '' : 4);
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

        <Row
          justify="space-around"
          gutter={[{ xs: 0, sm: 24 }, 18]}
        >

          {[0, 1, 2, 3].map(i =>
            < Col
              key={i}
              xs={loopLength <= 12 ? 12 : 24}
              sm={loopLength <= 8 ? 6 : 12}
              md={loopLength <= 12 ? 6 : 12}
              lg={6}
              style={{
                boxSizing: 'border-box',
                borderRadius: '3%',
              }}
            >
              <Card
                title={<ChordDropDown i={i} />}
                bordered={false}
              >

                {rows.map((row, j) =>
                  <Row
                    key={j}
                    justify="space-around"
                    gutter={16}
                  >
                    {chordLength(i).map(beat =>

                      <Button
                        shape="circle"
                        onClick={() => {
                          const note = getNote(row.name, beat)
                          toggleNote(beat, note, row)
                        }}
                        key={beat}
                        style={{
                          overflow: 'hidden',
                          alignItems: 'center',
                          justifyContent: 'center',
                          display: 'flex',
                          margin: '.2rem 0',
                          transition: 'none',

                          color: buttons[row.name][beat] ?
                            colors.purple
                            : String(beat) === String(currentBeat) ?
                              colors.pink : colors.cyan,

                          backgroundColor: String(beat) === String(currentBeat) ?
                            '#ffa4cd'
                            : !buttons[row.name][beat] ? colors.cyan : '#24ddd8',

                          borderColor: String(beat) === String(currentBeat) ?
                            '#ffa4cd'
                            : buttons[row.name][beat] && '#24ddd8',

                          borderWidth: '2px'
                        }}
                        className="note"
                        size="middle"
                        ghost={!buttons[row.name][beat] ? true : false}

                        type={!buttons[row.name][beat] ? 'default' : 'primary'}
                      >
                        <CustomIcon noteRow={row.name} />

                      </Button>

                    )}
                    {['low', 'bassLow'].includes(row.name) && <Divider style={{ width: '5px' }} />}
                  </Row>
                )}
              </Card>
            </Col>
          )}

        </Row>
  )
}


function ChordDropDown({ i }) {

  const {
    prog,
    isMobile,
    handleChordChange
  } = useContext(Context);

  return (
    <Select
      value={he.decode(prog[i])}
      onChange={val => handleChordChange(val, i)}
      size={isMobile ? "middle" : "small"}
      style={{ minWidth: '4rem' }}
    >
      {CHORDS && Object.keys(CHORDS).map((chord, j) =>
        <Option
          key={j}
          value={chord}
        >{he.decode(chord)}</Option>
      )}
    </Select>
  )

}


function CustomIcon({ noteRow }) {
  switch (noteRow) {
    case 'high':
    case 'low':
    case 'mid':
      return <IconFont type="icon-piano" style={{ fontSize: '1.2rem' }} />
    case 'bassHigh':
    case 'bassLow':
      return <InlineIcon
        style={{ fontSize: '1.2rem' }}
        icon={musicClefBass} />
    case 'bassDrum':
      return <IconFont type="icon-Drum-" style={{ fontSize: '1.2rem' }} />
    case 'snareDrum':
      return <InlineIcon
        style={{ fontSize: '1.2rem' }}
        icon={drumIcon} />
    case 'cymbal':
      return <IconFont type="icon-Cymbal" style={{ fontSize: '1.2rem' }} />
    default:
      return null
  }
}