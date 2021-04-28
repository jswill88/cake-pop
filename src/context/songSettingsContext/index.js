import { useState, useEffect, useRef, createContext } from 'react';
import { startLength } from '../../lib/constants'
import { useSongSettings } from './useSongSettings';
import { useStoppingFunctions } from './useStoppingFunctions';

const SongSettingsContext = createContext()

function SongSettingsContextProvider ({ children }) {
  const [noteSwitches, setNoteSwitches] = useState({})
  const [prog, setProg] = useState(['I', 'I', 'I', 'I'])
  const [loopLength, setLoopLength] = useState(startLength);
  const [buttons, setButtons] = useState({})
  const loopDraw = useRef(null);

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
    setButtons,
    loopDraw
  }

  return (
    <SongSettingsContext.Provider value={state}>
      {children}
    </SongSettingsContext.Provider>
  )
}

export { SongSettingsContext, useSongSettings, useStoppingFunctions }

export default SongSettingsContextProvider;