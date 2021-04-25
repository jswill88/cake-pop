import { useState } from 'react';
import { useLoggedIn, LoggedInContext } from './useLoggedIn';

function LoggedInContextProvider({ children }) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const state = {
    loggedIn,
    setLoggedIn,
    user,
    setUser,
  }
  return (
    <LoggedInContext.Provider value={state}>
      {children}
    </LoggedInContext.Provider>
  )
}

export { useLoggedIn, }

export { LoggedInContext }

export default LoggedInContextProvider;






