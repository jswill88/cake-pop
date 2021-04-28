import { createContext, useContext } from 'react';
import message from 'antd/es/message'
import useFetch from '../../hooks/ajax'
import { useCookies } from 'react-cookie';
import { useSongList }  from '../SongListContext'
import { useOpenSong } from '../OpenSongContext';
import { useSongSettings, useStoppingFunctions } from '../SongSettingsContext';
import { useTone } from '../ToneContext';

const LoggedInContext = createContext();

function useLoggedIn() {
  const { loggedIn, setLoggedIn, user, setUser } = useContext(LoggedInContext);
  const { setOpenSongId, setTitle } = useOpenSong();
  const { setLoopLength, setProg } = useSongSettings();
  const { reset } = useStoppingFunctions();
  const { handleTempoChange } = useTone();
  const [, setCookie, removeCookie] = useCookies(['token']);
  const fetchApi = useFetch();
  const { setSongs } = useSongList();

  const signIn = async (userData) => {
    const result = await fetchApi('/signin', 'post', userData)
    if (!result.error) {
      setLoggedIn(true)
      setUser(result.data.username);
      setSongs(result.data.songs);
      setCookie('token', result.data.token);
      return 'success';
    } else {
      message.error(result.message)
      return 'error';
    }
  }

  const signUp = async (userData) => {
    const result = await fetchApi('/signup', 'post', userData);
    if (!result.error) {
      setLoggedIn(true)
      setUser(userData.username || userData.email);
      setCookie('token', result.data.token)
      return 'success';
    } else {
      message.error(result.message)
      return 'error';
    }
  }

  const logout = async () => {
    const result = await fetchApi('/logout', 'get')
    if (!result.error) {
      setLoggedIn(false)
      setUser('')
      setSongs([])
      setOpenSongId(false)
      setTitle('New Song')
      reset();
      handleTempoChange(120);
      setLoopLength(12)
      setProg(['I', 'I', 'I', 'I']);
      removeCookie('token');
    } else {
      message.error(result.message)
      return 'error';
    }
  }

  

  return {
    signIn,
    signUp,
    user,
    loggedIn,
    setLoggedIn,
    setUser,
    logout
  }
}

export { useLoggedIn }

export { LoggedInContext }