import { usePlayControls } from '../ToneContext/'
import { useContext } from 'react';
import { SongSettingsContext } from './index'

export function useStoppingFunctions() {

  const {
    buttons,
    setButtons,
    loopLength,
    setLoopLength
  } = useContext(SongSettingsContext)

  const { stopAudio } = usePlayControls();

  const reset = async () => {
    stopAudio()
    const buttonObj = {};
    for (let noteRow in buttons) {
      buttonObj[noteRow] = new Array(loopLength).fill(false);
    }

    setButtons(buttonObj)
  }

  const handleLoopLengthChange = newLength => {
    stopAudio();
    setLoopLength(newLength);
    const buttonObj = {};
    ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
      buttonObj[row] = new Array(newLength).fill(false);
    })
    setButtons(buttonObj);
  }


  return {
    reset,
    handleLoopLengthChange
  }

}