import { createContext, useState } from 'react';
import useFetch from '../hooks/ajax'

export const LoginContext = createContext();

 function LoginProvider (props) {
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
  // const logout = () => {}
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

  const state = {
    loggedIn,
    signIn,
    signUp,
    logout,
    songs,
    user,
  }

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  )
}
export default LoginProvider
