import { createContext, useState } from 'react';
import useFetch from '../hooks/ajax'

export const LoginContext = createContext();

 function LoginProvider (props) {
  const [prog, setProg] = useState(['I', 'V', 'vi', 'IV'])
  const [tempo, setTempo] = useState(120);
  const [noteSwitches, setNoteSwitches] = useState({});
  const [loopLength, setLoopLength] = useState(12);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [songs, setSongs] = useState([]);

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
    console.log(result);
    if(result !== 'error') {
      return 'success'
    } else {
      return 'error';
    }
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
  }

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  )
}
export default LoginProvider
