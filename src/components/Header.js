import { useContext, useState } from 'react';
import { LoginContext } from '../context/loggedIn';

import SignInForm from './SignInForm';

const styles = {
  border: '2px solid black',
  width: '200px',
  fontSize: '1em',
  textAlign: 'center'
}

export default function Header() {
  const [showForm, setShowForm] = useState(false);
  const {
    // signIn,
    // signUp,
    saveSong,
    logout,
    user,
    loggedIn,
  } = useContext(LoginContext);

  return (
    <header>
      <h1 style={{
        fontFamily: 'monospace',
        textAlign: 'center',
      }}>
        32 Beat Processor
      </h1>
      {loggedIn && <p>hi {user}</p>}
      {!loggedIn ?
        <>
          {/* <h1
            onClick={() => {
              signUp({ test: 'ing' });
            }}
            style={{ ...styles, color: 'black' }}
          >Sign Up
          </h1> */}
          {!showForm ?
          <h1
          onClick={() => setShowForm(true)}
            style={{ ...styles, color: 'black' }}
          >Sign In
         </h1> :
          <SignInForm setShowForm={setShowForm} />
         }
        </>
        :
        <>
        <h1
        onClick={() => logout()}
        >Log Out</h1>
        <h1
        onClick={() => saveSong()}
        >Save</h1>
        </>

      }
    </header>
  )
}