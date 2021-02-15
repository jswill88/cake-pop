import { useState, useContext } from 'react';
import { Context } from '../context/context'

export default function SignInForm({ setShowForm }) {
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('');
  const [username, setUsername] = useState('')

  const { signIn, signUp } = useContext(Context)

  return (
    <div>
      {!showSignUp ?
        <form>
          <h2>Sign In Form</h2>
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
              let result = await signIn({ email, password })
              if (result !== 'error') setShowForm(false)
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
          <h2>Sign Up Form</h2>
          <label>Email</label>
          <input
            onChange={e => setEmail(e.target.value)}
          />
          <label>Username</label>
          <input
            onChange={e => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            onChange={e => setPasswordVerify(e.target.value)}
          />
          <button
            onClick={async e => {
              e.preventDefault();
              const result = await signUp({
                email, username, password, passwordVerify
              });
              if (result !== 'error') setShowForm(false)
            }}
          >Sign Up</button>
          <p
            onClick={() => {
              setShowSignUp(false);
              setEmail('');
              setPassword('');
            }}
          >Already have an account? Click to sign in</p>
        </form>
      }
      <p
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => setShowForm(false)}
      >X</p>
    </div>
  )
}