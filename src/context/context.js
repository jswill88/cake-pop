import { createContext, useState } from 'react';
import useFetch from '../hooks/ajax'
import * as Tone from 'tone';

export const Context = createContext();

 function LoginProvider (props) {
  const [prog, setProg] = useState(['I', 'V', 'vi', 'IV'])
  const [tempo, setTempo] = useState(120);
  const [title, setTitle] = useState('Untitled')
  const [noteSwitches, setNoteSwitches] = useState({});
  const [loopLength, setLoopLength] = useState(12);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [songs, setSongs] = useState([]);
  const [degrees, setDegrees] = useState(70);

  const fetchApi = useFetch();
  
  const signIn = async (userData) => {
    const result = await fetchApi('/signin','post', userData)
    
    if(result !== 'error') {
      setLoggedIn(true)
      setUser(result.data.username);
      setSongs(result.data.songs);
      return 'success';
    } else {
      return 'error';
    }
  }

  const signUp = async (userData) => {
    const result = await fetchApi('/signup','post', userData);
    if(result !== 'error') {
      setLoggedIn(true)
      setUser(userData.username);
      return 'success';
    } else {
      return 'error';
    }
  }

  const logout = async () => {
    const result = await fetchApi('/logout', 'get')
    if(result !== 'error') {
      setLoggedIn(false)
      setUser('')
      setSongs([])
    } else {
      return 'error';
    }
  }

  const saveSong = async () => {
    const noteObj = {};
    for(let row in noteSwitches) {
      noteObj[row] = {}
      for (let beat in noteSwitches[row]) {
        if(!noteSwitches[row][beat])
          noteObj[row][beat] = false;
        else noteObj[row][beat] = true;
      }
    }

    const songObj = {
      title: 'practice',
      buttonsPressed: noteObj,
      bpm: tempo || 120,
      numberOfBeats: loopLength,
      chordProgression: prog,
    }
    const result = await fetchApi('/save','post', songObj)
    console.log(result.data);
    if(result !== 'error') {
      setSongs(arr => [...arr, result.data])
      return 'success'
    } else {
      return 'error';
    }
  }

  const open = async (songId) => {
    const result = await fetchApi('/open', 'post',{ songId })
    if(result !== 'error') {
      const { data: songObj } = result
      console.log('hello')
      console.log('data', songObj )
      console.log('tempo', songObj.bpm)
      setProg(songObj.chordProgression);
      handleTempoChange(songObj.bpm)
      setDegrees(songObj.bpm - 50)
      setTitle(songObj.title)

      return 'success'
    } else {
      return 'error';
    }
    // need to construct song ased on result data
  }
  const handleTempoChange = newTempo => {
    const tempo = newTempo < 50 ? 50 : Math.min(350, newTempo)
    Tone.Transport.bpm.value = tempo;
    setTempo(tempo)
  }

  const state = {
    loggedIn,
    signIn,
    signUp,
    logout,
    saveSong,
    songs,
    user,
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
    degrees,
    setDegrees,
    title,
    setTitle
  }

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}
export default LoginProvider
