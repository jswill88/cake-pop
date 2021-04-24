import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useLoggedIn, LoggedInContext } from './useLoggedIn'


function LoggedInContextProvider(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const token = cookies.token

    const checkLoggedIn = async () => {
      const result = await axios({
        url: process.env.REACT_APP_URL + '/api/v1/loggedIn',
        method: 'post',
        data: { token }
      })

      if (result.data) {
        // setSongs needs to be moved out into a hook
        // setSongs(result.data.songList);
        console.log(result.data)
        setUser(result.data.username);
        setLoggedIn(true);
      }
    }
    checkLoggedIn();

  }, [cookies.token]);

  const state = {
    loggedIn,
    setLoggedIn,
    user,
    setUser,
  }
  return (
    <LoggedInContext.Provider value={state}>
      {props.children}
    </LoggedInContext.Provider>
  )
}

export { useLoggedIn }

export { LoggedInContext }

export default LoggedInContextProvider;






