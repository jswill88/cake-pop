import { createContext, useEffect, useState, useRef } from 'react';
import useFetch from '../hooks/ajax'
import * as Tone from 'tone';
import { BASS, CHORDS } from '../lib/noteInfo';
import { SYNTHS, synthTypes } from '../lib/synthInfo';

import message from 'antd/es/message'
import Grid from 'antd/es/grid';

import { useCookies } from 'react-cookie';

const { useBreakpoint } = Grid;

export const Context = createContext();

const extraTime = .1;
const startLength = 12;

function ContextProvider(props) {
  const [prog, setProg] = useState(['I', 'I', 'I', 'I'])
  const [tempo, setTempo] = useState(120);
  const [title, setTitle] = useState('New Song')
  const [noteSwitches, setNoteSwitches] = useState({});
  const [buttons, setButtons] = useState({})
  const [synths, setSynths] = useState({})

  const [loopLength, setLoopLength] = useState(startLength);
  const [songs, setSongs] = useState([]);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [openSongId, setOpenSongId] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [playStatus, setPlayStatus] = useState('stop');
  const [screenSize, setScreenSize] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('home')

  const loopDraw = useRef(null)

  const [cookies] = useCookies(['token'])

  const screens = useBreakpoint();

  const fetchApi = useFetch();

  const makeSynth = type => {
    const gainNode = new Tone.Gain(.2).toDestination();
    return new Tone[synthTypes[type]](SYNTHS[type]).connect(gainNode)
  };

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
      await Tone.start();
      ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
        let type;
        if (['bassHigh', 'bassLow'].includes(row)) type = 'bassSynth'
        else if (['high', 'mid', 'low'].includes(row)) type = 'chordSynth'
        else type = row;
        const newSynth = makeSynth(type);
        setSynths(synthObj => ({ ...synthObj, [row]: newSynth }))
      });
      window.removeEventListener('click', startTone)
      window.removeEventListener('touchstart', startTone)
    };
    window.addEventListener('click', startTone)
    window.addEventListener('touchstart', startTone)
  }, [])

  useEffect(() => {
    const buttonObj = {};
    ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
      buttonObj[row] = new Array(startLength).fill(false);
    })
    setButtons(buttonObj);
  }, [])

  const makeLoops = () => {

    const noteObj = {};

    ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
      let type;
      if (['bassHigh', 'bassLow'].includes(row)) type = 'bassSynth'
      else if (['high', 'mid', 'low'].includes(row)) type = 'chordSynth'
      else type = row;

      const synth = synths[row];

      noteObj[row] = new Tone.Sequence((time, note) => {
        if (type === 'snareDrum') synth.triggerAttackRelease('16n', time + extraTime)
        else synth.triggerAttackRelease(note, '8n', time + extraTime)
      }, buttons[row].map(note => note ? [note] : [])).start(0);
    })

    setNoteSwitches(noteObj)

    const arrOfIdx = new Array(loopLength).fill(0).map((_, i) => i);
    loopDraw.current = new Tone.Sequence((time, note) => {
      Tone.Draw.schedule(() => {
        setCurrentBeat(note)
      }, time)
    }, arrOfIdx).start(0);
  }

  /**
   * @param {String} type Should be 'new' or 'update'
   */
  const saveSong = async (type, newTitle) => {

    const songObj = {
      title: newTitle || title,
      buttonsPressed: buttons,
      bpm: tempo,
      numberOfBeats: loopLength,
      chordProgression: prog,
      token: cookies.token
    }
    if (type === 'update') {
      songObj.songId = openSongId;
    }
    const result = await fetchApi(
      type === 'update' ? '/update' : '/save',
      type === 'update' ? 'put' : 'post',
      songObj)

    if (!result.error) {
      if (type === 'new') {
        setSongs(arr => [...arr, result.data])
        setOpenSongId(result.data.id)
        setTitle(result.data.title)
      }
      message.success(`${result.data.title} successfully saved`)
      return 'success'
    } else {
      message.error(result.message)
      return 'error';
    }
  }

  const newSong = async () => {
    reset();
    setOpenSongId(false);
    handleTempoChange(120);
    setProg(['I', 'I', 'I', 'I']);
    const titles = songs.map(({ title }) => title)
    let newTitle = 'New Song'
    let i = 1;
    while (titles.includes(newTitle)) {
      newTitle = `New Song ${i}`;
      i++;
    }
    setTitle(newTitle);
    return 'success';

  }

  const open = async (songId) => {
    stopAudio()
    const result = await fetchApi('/open', 'post', { token: cookies.token, songId })
    if (!result.error) {

      const { data: songObj } = result;
      setProg(songObj.chordProgression);
      handleTempoChange(songObj.bpm)
      setLoopLength(songObj.numberOfBeats);
      setTitle(songObj.title)
      setOpenSongId(songObj._id)
      setButtons({ ...songObj.buttonsPressed })
      return 'success'
    } else {
      message.error(result.message)
      return 'error';
    }
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

  const rename = async newTitle => {
    if (songs.length) {
      let songInList = songs.filter(({ title: titleInList }) => titleInList === title)
      if (songInList.length) {
        const { id: songId } = songInList[0];
        const result = await fetchApi('/rename', 'patch', { newTitle, songId, token: cookies.token });
        if (result.error) {
          message.error(result.message)
          return 'error';
        } else {
          const newSongs = songs.map(song => {
            if (song.id === songId) return { title: result.data.newTitle, id: song.id }
            else return song;
          });
          newTitle = result.data.newTitle;
          setSongs([...newSongs])
        }
      }
    } 
    setTitle(newTitle)
  }

  const deleteSong = async () => {
    const result = await fetchApi('/deletesong', 'delete', {
      songIdToDelete: openSongId,
      token: cookies.token
    })
    if (!result.error) {
      reset();
      setSongs(arr => arr.filter(({ id }) => id !== openSongId))
      setOpenSongId(false);
      setTitle('New Song');
      handleTempoChange(120);
      setProg(['I', 'I', 'I', 'I']);
      message.success(`${result.data.title} successfullly deleted`)
      return 'success';
    } else {
      message.error(result.message)
      return 'error'
    }
  }

  const handleTempoChange = newTempo => {
    const tempo = newTempo < 50 ? 50 : Math.min(320, newTempo)
    Tone.Transport.bpm.rampTo(tempo, 1);
    setTempo(tempo)
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

  const reset = async () => {
    stopAudio()
    const buttonObj = {};
    for (let noteRow in buttons) {
      buttonObj[noteRow] = new Array(loopLength).fill(false);
    }

    setButtons(buttonObj)
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
    saveSong,
    setSongs,
    setOpenSongId,
    songs,
    noteSwitches,
    setNoteSwitches,
    prog,
    setProg,
    loopLength,
    setLoopLength,
    tempo,
    setTempo,
    open,
    handleTempoChange,
    Tone,
    title,
    setTitle,
    currentBeat,
    setCurrentBeat,
    reset,
    NOTES,
    makeSynth,
    rename,
    openSongId,
    deleteSong,
    newSong,
    showForm,
    setShowForm,
    playStatus,
    setPlayStatus,
    handleChordChange,
    buttons,
    setButtons,
    stopAudio,
    screenSize,
    screens,
    isMobile,
    selectedMenuItem,
    setSelectedMenuItem,
    makeLoops,
    handleLoopLengthChange
  }

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}
export default ContextProvider;
