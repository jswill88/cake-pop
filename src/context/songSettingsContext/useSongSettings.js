import { createContext, useContext } from 'react';

export const SongSettingsContext = createContext()

export function useSongSettings () {
  const {
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    loopLength,
    setLoopLength,
    buttons,
    setButtons
  } = useContext(SongSettingsContext);

  const handleLoopLengthChange = newLength => {
    // stopAudio();
    setLoopLength(newLength);
    const buttonObj = {};
    ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
      buttonObj[row] = new Array(newLength).fill(false);
    })
    setButtons(buttonObj);
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
            // note = BASS[newChord][noteRow === 'bassLow' ? 0 : 1];
          } else {
            // note = CHORDS[newChord][2 - Object.keys(NOTES).indexOf(noteRow)] + 4;
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

  return {
    handleChordChange,
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    handleLoopLengthChange,
    loopLength,
    setLoopLength,
    buttons,
    setButtons
  };
}
