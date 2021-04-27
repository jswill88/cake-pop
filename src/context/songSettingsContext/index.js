import { useState, useEffect } from 'react';
import { startLength } from '../../lib/constants'
import { useSongSettings, SongSettingsContext } from './useSongSettings';

function SongSettingsContextProvider ({ children }) {
  const [noteSwitches, setNoteSwitches] = useState({})
  const [prog, setProg] = useState(['I', 'I', 'I', 'I'])
  const [loopLength, setLoopLength] = useState(startLength);
  const [buttons, setButtons] = useState({})

  useEffect(() => {
    const buttonObj = {};
    ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
      buttonObj[row] = new Array(startLength).fill(false);
    })
    setButtons(buttonObj);
  }, [])

  const state = {
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    loopLength,
    setLoopLength,
    buttons,
    setButtons
  }
  return (
    <SongSettingsContext.Provider value={state}>
      {children}
    </SongSettingsContext.Provider>
  )
}

export { SongSettingsContext }
export { useSongSettings }

export default SongSettingsContextProvider;