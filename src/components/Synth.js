import { useContext } from 'react';
import NoteRow from './NoteRow';
import { Context } from '../context/context';

export default function Synth() {

  const {
    noteSwitches,
  } = useContext(Context)


  return (
    <>

      {
        ('high' in noteSwitches) &&
        <>
          {Object.keys(noteSwitches).map(noteRow =>
            <NoteRow
              key={noteRow}
              noteRow={noteRow}
            />
          )}
        </>
      }
    </ >
  )
}
