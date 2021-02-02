import { createContext, useState } from 'react';
import useFetch from '../hooks/ajax'

export const LoginContext = createContext();

 function LoginProvider (props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const fetchApi = useFetch();
  
  const signIn = async () => {
    const result = await fetchApi('/test','post')
    console.log(result)
    setLoggedIn(loginState => !loginState)
  }
  // const logout = () => {}
  const signUp = async (userData) => {
    const result = await fetchApi('/signup','post', {username:'jo', password: 'whatsup'});
    console.log(result)
  }

  const state = {
    loggedIn: loggedIn,
    signIn,
    signUp
  }

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  )
}
export default LoginProvider
