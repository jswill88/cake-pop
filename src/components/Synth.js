import { useContext } from 'react';
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
          <Row
            justify="space-between"
          >
            <NoteColumns />
          </Row>
        </>
      }
    </ >
  )
}
