import { useContext } from 'react';
import NoteRow from './NoteRow';
import NoteColumns from './NoteColumns'
import { Context } from '../context/context';
import { Row } from 'antd';

export default function Synth() {

  const {
    noteSwitches,
  } = useContext(Context)


  return (
    <>

      {
        ('high' in noteSwitches) &&
        <>
          {/* {Object.keys(noteSwitches).map(noteRow =>
            <NoteRow
              key={noteRow}
              noteRow={noteRow}
            />
          )} */}
          {/* <NoteRow /> */}
          <Row
            justify="space-between"
          >
            {/* {NoteColumns()} */}
            <NoteColumns />
          </Row>
        </>
      }
    </ >
  )
}
