import { createContext, useContext } from 'react';
import message from 'antd/es/message'
import useFetch from '../../hooks/ajax'
import { useCookies } from 'react-cookie';
import { useSongList }  from '../songListContext/'

const LoggedInContext = createContext();

function useLoggedIn() {
  const { loggedIn, setLoggedIn, user, setUser } = useContext(LoggedInContext);
  const [, setCookie,] = useCookies(['token']);
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

  return {
    signIn,
    signUp,
    user,
    loggedIn,
    setLoggedIn,
    setUser,
  }
}

export { useLoggedIn }

export { LoggedInContext }