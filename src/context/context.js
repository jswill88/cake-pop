import { createContext, useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';
// import { BASS, CHORDS } from '../lib/noteInfo';
import { SYNTHS, synthTypes } from '../lib/synthInfo';

import Grid from 'antd/es/grid';

const { useBreakpoint } = Grid;

export const Context = createContext();

export const extraTime = .1;


function ContextProvider(props) {
  const [tempo, setTempo] = useState(120);
  // const [buttons, setButtons] = useState({})
  const [synths, setSynths] = useState({})

  const [currentBeat, setCurrentBeat] = useState(-1);
  // const [showForm, setShowForm] = useState(false);
  const [playStatus, setPlayStatus] = useState('stop');
  const [screenSize, setScreenSize] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('home')
  
  const loopDraw = useRef(null)

  const screens = useBreakpoint();

  const makeSynth = type => {
    const gainNode = new Tone.Gain(.2).toDestination();
    return new Tone[synthTypes[type]](SYNTHS[type]).connect(gainNode)
  };

  // const NOTES = {
  //   high: [CHORDS[prog[0]][2], CHORDS[prog[1]][2], CHORDS[prog[2]][2], CHORDS[prog[3]][2]],
  //   mid: [CHORDS[prog[0]][1], CHORDS[prog[1]][1], CHORDS[prog[2]][1], CHORDS[prog[3]][1]],
  //   low: [CHORDS[prog[0]][0], CHORDS[prog[1]][0], CHORDS[prog[2]][0], CHORDS[prog[3]][0]],
  //   bassHigh: [BASS[prog[0]][1], BASS[prog[1]][1], BASS[prog[2]][1], BASS[prog[3]][1]],
  //   bassLow: [BASS[prog[0]][0], BASS[prog[1]][0], BASS[prog[2]][0], BASS[prog[3]][0]],
  //   cymbal: ['C1', 'C1', 'C1', 'C1'],
  //   snareDrum: ['S', 'S', 'S', 'S'],
  //   bassDrum: ['C1', 'C1', 'C1', 'C1'],
  // }


  useEffect(() => {
    const updatedScreens = []
    for (let key in screens) {
      if (screens[key]) updatedScreens.push(key);
    }
    setScreenSize(updatedScreens)
  }, [screens])

  useEffect(() => {
    if (screenSize.every(val => val === 'xs')) setIsMobile(true);
    else setIsMobile(false)
  }, [screenSize])

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

  // moved to Primary buttons, because it is the only component that uses this
  // const makeLoops = () => {

  //   const noteObj = {};

  //   ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
  //     let type;
  //     if (['bassHigh', 'bassLow'].includes(row)) type = 'bassSynth'
  //     else if (['high', 'mid', 'low'].includes(row)) type = 'chordSynth'
  //     else type = row;

  //     const synth = synths[row];

  //     noteObj[row] = new Tone.Sequence((time, note) => {
  //       if (type === 'snareDrum') synth.triggerAttackRelease('16n', time + extraTime)
  //       else synth.triggerAttackRelease(note, '8n', time + extraTime)
  //     }, buttons[row].map(note => note ? [note] : [])).start(0);
  //   })

  //   setNoteSwitches(noteObj)

  //   const arrOfIdx = new Array(loopLength).fill(0).map((_, i) => i);
  //   loopDraw.current = new Tone.Sequence((time, note) => {
  //     Tone.Draw.schedule(() => {
  //       setCurrentBeat(note)
  //     }, time)
  //   }, arrOfIdx).start(0);
  // }


  const handleTempoChange = newTempo => {
    const tempo = newTempo < 50 ? 50 : Math.min(320, newTempo)
    Tone.Transport.bpm.rampTo(tempo, 1);
    setTempo(tempo)
  }

  const cleanUp = () => {
    // for (let noteRow in noteSwitches) {
    //   noteSwitches[noteRow].cancel()
    //   noteSwitches[noteRow].clear();
    //   noteSwitches[noteRow].dispose();
    // }
    if (loopDraw.current) {
      loopDraw.current.cancel()
      loopDraw.current.clear();
      loopDraw.current.dispose();
      loopDraw.current = null;
    }
  }

  const reset = async () => {
    stopAudio()
    // const buttonObj = {};
    // for (let noteRow in buttons) {
    //   buttonObj[noteRow] = new Array(loopLength).fill(false);
    // }

    // setButtons(buttonObj)
  }

  const stopAudio = () => {
    const waitTime = playStatus === 'start' ? Tone.Time("8n").toSeconds() : 0;
    if (playStatus !== 'stop') {
      Tone.Transport.stop('8n')
      setPlayStatus('stop')
    }
    setTimeout(() => {
      setCurrentBeat(-2)
      cleanUp();
    }, waitTime * 1000)
  }

  const state = {
    tempo,
    setTempo,
    handleTempoChange,
    Tone,
    currentBeat,
    setCurrentBeat,
    reset,
    // NOTES,
    playStatus,
    setPlayStatus,
    stopAudio,
    screenSize,
    screens,
    isMobile,
    selectedMenuItem,
    setSelectedMenuItem,
    synths,
    loopDraw
  }

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}
export default ContextProvider;
