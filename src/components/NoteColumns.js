import { Context } from '../context/context'
import { useContext } from 'react'
import { InlineIcon } from '@iconify/react';
import he from 'he';
import { NOTES } from '../constants'
import useIsMobile from '../hooks/useIsMobile';
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

const { CHORDS } = NOTES;


export default function NoteColumns() {
  const {
    currentBeat,
    notes,
    loopLength,
    buttons,
    rows,
    updateButtons
  } = useContext(Context)

  const toggleNote = (beat, idx, row) => {
    row.toggleNote(idx, notes[row.name][beat]);
    updateButtons();
  }

  const getSubdivisionIndicies = beat => {
    let start = beat * loopLength / 4;
    const end = start + loopLength / 4;
    const indices = [];
    for (let i = start; i < end; i++) indices.push(i);
    return indices;
  }

  return (
    <Row
      justify="space-around"
      gutter={[{ xs: 0, sm: 24 }, 18]}
    >
      {[0, 1, 2, 3].map(beat =>
        <Col
          key={beat}
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
            title={<ChordDropDown beat={beat} />}
            bordered={false}
          >
            {rows.map((row, j) =>
              <Row
                key={row.name}
                justify="space-around"
                gutter={16}
                style={{ marginBlock: '.4rem' }}
              >
                {getSubdivisionIndicies(beat).map(idx =>
                  <Button
                    shape="circle"
                    onClick={() => toggleNote(beat, idx, row)}
                    key={row.name + idx}
                    color={String(idx) === String(currentBeat) ? 'pink' : 'cyan'}
                    style={{
                      transition: 'none'
                    }}
                    className="note"
                    size="middle"
                    variant={!buttons[row.name][idx] ? 'outlined' : 'solid'}
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
  );
}


function ChordDropDown({ beat }) {
  const {
    prog,
    handleChordChange
  } = useContext(Context);
  const isMobile = useIsMobile();

  return (
    <Select
      value={he.decode(prog[beat])}
      onChange={val => handleChordChange(val, beat)}
      size={isMobile ? "middle" : "small"}
      style={{ minWidth: '4rem' }}
    >
      {CHORDS && Object.keys(CHORDS).map(chord =>
        <Option
          key={chord}
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
