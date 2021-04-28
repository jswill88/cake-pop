import { useContext } from 'react';
import { BASS, CHORDS } from '../../lib/noteInfo';
import { SongSettingsContext } from './index'

export function useSongSettings() {
  const {
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    loopLength,
    setLoopLength,
    buttons,
    setButtons,
    loopDraw
  } = useContext(SongSettingsContext);

  const NOTES = {
    high: [CHORDS[prog[0]][2], CHORDS[prog[1]][2], CHORDS[prog[2]][2], CHORDS[prog[3]][2]],
    mid: [CHORDS[prog[0]][1], CHORDS[prog[1]][1], CHORDS[prog[2]][1], CHORDS[prog[3]][1]],
    low: [CHORDS[prog[0]][0], CHORDS[prog[1]][0], CHORDS[prog[2]][0], CHORDS[prog[3]][0]],
    bassHigh: [BASS[prog[0]][1], BASS[prog[1]][1], BASS[prog[2]][1], BASS[prog[3]][1]],
    bassLow: [BASS[prog[0]][0], BASS[prog[1]][0], BASS[prog[2]][0], BASS[prog[3]][0]],
    cymbal: ['C1', 'C1', 'C1', 'C1'],
    snareDrum: ['S', 'S', 'S', 'S'],
    bassDrum: ['C1', 'C1', 'C1', 'C1'],
  }

  const handleChordChange = (newChord, i) => {
    setProg(arr => {
      const arrCopy = [...arr]
      arrCopy[i] = newChord;
      return arrCopy;
    });

    const start = i * loopLength / 4;
    const end = start + loopLength / 4
    const noteRows = ['high', 'mid', 'low', 'bassHigh', 'bassLow']
    noteRows.forEach(noteRow => {
      for (let i = start; i < end; i++) {
        if (buttons[noteRow][i]) {
          let note;
          if (['bassLow', 'bassHigh'].includes(noteRow)) {
            note = BASS[newChord][noteRow === 'bassLow' ? 0 : 1];
          } else {
            note = CHORDS[newChord][2 - Object.keys(NOTES).indexOf(noteRow)] + 4;
          }
          if (noteSwitches[noteRow]?.events[i]?.length) {
            const newNoteArr = noteSwitches[noteRow].events;
            newNoteArr[i] = note;
            noteSwitches[noteRow].events = newNoteArr;
          }
          buttons[noteRow][i] = note;
        }
      }
    })
  }

  const cleanUp = () => {
    for (let noteRow in noteSwitches) {
      noteSwitches[noteRow].cancel()
      noteSwitches[noteRow].clear();
      noteSwitches[noteRow].dispose();
    }
    if (loopDraw.current) {
      loopDraw.current.cancel()
      loopDraw.current.clear();
      loopDraw.current.dispose();
      loopDraw.current = null;
    }
  }


  return {
    handleChordChange,
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    loopLength,
    setLoopLength,
    buttons,
    setButtons,
    NOTES,
    cleanUp,
    loopDraw
  };
}
