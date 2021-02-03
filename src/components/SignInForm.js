import { useState, useContext } from 'react';
import { LoginContext } from '../context/loggedIn'

export default function SignInForm() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(LoginContext)

  return (
    <>
      {!showSignUp ?
        <form>
          <label>Email:</label>
          <input
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)} />
          <button
            onClick={async e => {
              e.preventDefault();
              await signIn({ email, password })
            }}
          >Sign In</button>
          <p
            onClick={() => {
              setShowSignUp(true);
              setEmail('');
              setPassword('');
            }}
          >Not registered yet? Make an account!</p>
        </form>
        :
        <form>
          <h2>sign up form</h2>
          <p
            onClick={() => {
              setShowSignUp(false);
              setEmail('');
              setPassword('');
            }}
          >Already have an account? Click to sign in</p>
        </form>
      }
    </>
  )
}