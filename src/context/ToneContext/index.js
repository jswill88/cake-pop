import { useState, useEffect, createContext } from 'react';
import * as Tone from 'tone';
import { startTempo } from '../../lib/constants';
import { synthTypes, SYNTHS } from '../../lib/synthInfo';
import { useTone, usePlayControls } from './useTone'

const ToneContext = createContext();

function ToneContextProvider ({ children }) {
  const [tempo, setTempo] = useState(startTempo);
  const [synths, setSynths] = useState({})
  const [playStatus, setPlayStatus] = useState('stop');
  const [currentBeat, setCurrentBeat] = useState(-1);
  

  const makeSynth = type => {
    const gainNode = new Tone.Gain(.2).toDestination();
    return new Tone[synthTypes[type]](SYNTHS[type]).connect(gainNode)
  };

  useEffect(() => {
    const startTone = async () => {
      console.log('audio started')
      window.removeEventListener('click', startTone)
      window.removeEventListener('touchstart', startTone)
      window.removeEventListener('mousemove', startTone)
      await Tone.start();
      ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
        let type;
        if (['bassHigh', 'bassLow'].includes(row)) type = 'bassSynth'
        else if (['high', 'mid', 'low'].includes(row)) type = 'chordSynth'
        else type = row;
        const newSynth = makeSynth(type);
        setSynths(synthObj => ({ ...synthObj, [row]: newSynth }))
      });
    };
    window.addEventListener('click', startTone)
    window.addEventListener('mousemove', startTone)
    window.addEventListener('touchstart', startTone)
  }, [])

  const state = {
    tempo,
    setTempo,
    Tone,
    synths,
    playStatus,
    setPlayStatus,
    currentBeat,
    setCurrentBeat,
  }
  return (
    <ToneContext.Provider value={state}>
      {children}
    </ToneContext.Provider>
  )
}

export { useTone, ToneContext, usePlayControls }
export default ToneContextProvider;