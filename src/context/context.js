import { createContext, useEffect, useState, useRef, useMemo } from 'react';
import useFetch from '../hooks/useFetch'
import axios from 'axios';
import * as Tone from 'tone';
import { rows, stopAudio as stop } from '../audio';
import { DEFAULTS, NOTES } from '../constants';
import message from 'antd/es/message';
import { useCookies } from 'react-cookie';

export const Context = createContext();

const { TEMPO, TITLE, PROGRESSION, LENGTH } = DEFAULTS;
const { CHORDS } = NOTES;
const noteRows = rows.toSorted((a, b) => a.order - b.order).filter(({ dynamicPitch }) => dynamicPitch)

const buttonObj =  {};
rows.forEach(({ name }) => {
  buttonObj[name] = new Array(LENGTH).fill(false);
});

function ContextProvider(props) {
  const [prog, setProg] = useState(PROGRESSION)
  const [tempo, setTempo] = useState(TEMPO);
  const [title, setTitle] = useState(TITLE)
  const [buttons, setButtons] = useState(buttonObj)
  const [loopLength, setLoopLength] = useState(LENGTH);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [openSongId, setOpenSongId] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [playStatus, setPlayStatus] = useState('stop');
  const [selectedMenuItem, setSelectedMenuItem] = useState('home')

  const loopDraw = useRef(null);

  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const fetchApi = useFetch();

  const notes = useMemo(() => ({
    high: prog.map(chord => CHORDS[chord].high),
    mid: prog.map(chord => CHORDS[chord].mid),
    low: prog.map(chord => CHORDS[chord].low),
    bassHigh: prog.map(chord => CHORDS[chord].bassHigh),
    bassLow: prog.map(chord => CHORDS[chord].bassLow),
    cymbal: ['C1', 'C1', 'C1', 'C1'],
    snareDrum: [true, true, true, true],
    bassDrum: ['C1', 'C1', 'C1', 'C1'],
  }), [prog]);

  useEffect(() => {
    const token = cookies.token;
    const checkLoggedIn = async () => {
      try {
        const result = await axios({
          url: process.env.REACT_APP_URL + '/api/v1/loggedIn',
          method: 'post',
          data: { token }
        });

        if (result.data) {
          setSongs(result.data.songList);
          setUser(result.data.username);
          setLoggedIn(true);
        }
      } catch (e) {
        console.error(e.message || e)
      }
    }
    checkLoggedIn();
  }, [cookies.token]);

  const makeLoops = () => {
    const arrOfIdx = new Array(loopLength).fill(0).map((_, i) => i);
    loopDraw.current = new Tone.Sequence((time, beat) => {
      Tone.getDraw().schedule(() => {
        if (Tone.getTransport().state === 'started') {
          setCurrentBeat(beat)
        }
      }, time);
    }, arrOfIdx).start(0);
  }

  const updateButtons = () => {
    const buttonObj = {};
    rows.forEach(({ name, sequence }) => {
      buttonObj[name] = sequence.events.map(arr => arr.length ? arr[0] : false);
    });
    setButtons(buttonObj);
  }

  const signIn = async (userData) => {
    const result = await fetchApi('/signin', 'post', userData)

    if (!result.error) {
      setLoggedIn(true)
      setUser(result.data.username);
      setSongs(result.data.songs);
      setCookie('token', result.data.token);
      return 'success';
    } else {
      message.error(result.message);
      return 'error';
    }
  }

  const signUp = async (userData) => {
    const result = await fetchApi('/signup', 'post', userData);
    if (!result.error) {
      setLoggedIn(true)
      setUser(userData.username || userData.email);
      setCookie('token', result.data.token);
      return 'success';
    } else {
      message.error(result.message);
      return 'error';
    }
  }

  const logout = async () => {
    const result = await fetchApi('/logout', 'get')
    if (!result.error) {
      setLoggedIn(false);
      setUser('');
      setSongs([]);
      setOpenSongId(false);
      setTitle(TITLE);
      reset();
      handleTempoChange(TEMPO);
      setLoopLength(LENGTH)
      setProg(PROGRESSION);
      removeCookie('token');
    } else {
      message.error(result.message);
      return 'error';
    }
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
    handleTempoChange(TEMPO);
    setProg(PROGRESSION);
    const titles = songs.map(({ title }) => title)
    let newTitle = TITLE
    let i = 1;
    while (titles.includes(newTitle)) {
      newTitle = `${TITLE} ${i}`;
      i++;
    }
    setTitle(newTitle);
    return 'success';
  }

  const open = async (songId) => {
    stopAudio()
    const result = await fetchApi('/open', 'post', { token: cookies.token, songId })
    if (!result.error) {
      const { data: loop } = result;
      setProg(loop.chordProgression);
      handleTempoChange(loop.bpm)
      setLoopLength(loop.numberOfBeats);
      setTitle(loop.title)
      setOpenSongId(loop._id)
      rows.forEach(row => {
        row.setRow(loop.buttonsPressed[row.name].map(note => note === false ? [] : [note]))
      });
      setButtons({ ...loop.buttonsPressed });
      return 'success';
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
    noteRows.forEach((row) => {
      for (let i = start; i < end; i++) {
        row.updateNote(i, CHORDS[newChord][row.name]);
      }
    });
    updateButtons();
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
            if (song.id === songId) return { title: newTitle, id: song.id }
            else return song;
          });
          setTitle(result.data.newTitle)
          setSongs([...newSongs])
        }
      } else {
        setTitle(newTitle);
      }
    } else {
      setTitle(newTitle);
    }

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
      setTitle(TITLE);
      handleTempoChange(TEMPO);
      setProg(PROGRESSION);
      message.success(`${result.data.title} successfullly deleted`)
      return 'success';
    } else {
      message.error(result.message);
      return 'error';
    }
  }

  const handleTempoChange = newTempo => {
    const tempo = Math.max(50, Math.min(320, newTempo));
    Tone.getTransport().bpm.rampTo(tempo, 1);
    setTempo(tempo);
  }

  const handleLoopLengthChange = newLength => {
    stopAudio();
    setLoopLength(newLength);
    rows.forEach(synth => synth.setLength(newLength));
    updateButtons();
  }

  const reset = async () => {
    stopAudio();
    rows.forEach(synth => synth.clearNotes());
    const buttonObj = {};
    for (const noteRow in buttons) {
      buttonObj[noteRow] = new Array(loopLength).fill(false);
    }
    setButtons(buttonObj);
  }

  const stopAudio = () => {
    if (playStatus === 'stop') return;
    stop(() => {
      setPlayStatus('stop');
      setCurrentBeat(-1);
    });
  }

  const state = {
    loggedIn,
    signIn,
    signUp,
    logout,
    saveSong,
    songs,
    user,
    prog,
    loopLength,
    tempo,
    open,
    handleTempoChange,
    Tone,
    title,
    setTitle,
    currentBeat,
    reset,
    notes,
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
    selectedMenuItem,
    setSelectedMenuItem,
    makeLoops,
    handleLoopLengthChange,
    rows,
    updateButtons
  }

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;
