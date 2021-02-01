import { useState, useContext } from 'react';
import { LoginContext } from '../context/loggedIn';

export default function PrimaryButtons({ Tone, setCurrentBeat, tempo, reset }) {

  const [playStatus, setPlayStatus] = useState('stop');
  const context = useContext(LoginContext);

  const startAudio = async () => {
    if (playStatus === 'stop') setCurrentBeat(-1)
    setPlayStatus('start')
    await Tone.start();
    Tone.Transport.bpm.value = tempo;
    Tone.Transport.start('+0.1');
  }

  const pauseAudio = () => {
    Tone.Transport.pause();
    setPlayStatus('pause')
  }

  const stopAudio = () => {
    setPlayStatus('stop')
    Tone.Transport.stop()
    setCurrentBeat(-2);
  }

  const styles = {
    border: '2px solid black',
    width: '200px',
    height: '30px',
    textAlign: 'center'
  }

  return (
    <section>
      {['pause', 'stop'].includes(playStatus) ?
        <h1
          onClick={() => startAudio()}
          style={{ ...styles, color: 'limegreen' }}
        >
          Play
      </h1> :
        <h1
          onClick={() => pauseAudio()}
          style={{ ...styles, color: 'blue' }}
        >
          Pause
        </h1>
      }
      <h1
        onClick={() => stopAudio()}
        style={{ ...styles, color: 'red' }}
      >Stop</h1>
      <h1
        onClick={() => {
          reset();
          setPlayStatus('stop')
        }}
        style={{ ...styles, color: 'orange' }}
      >Reset</h1>
      <h1
        onClick={() => {
          context.signIn();
        }}
        style={{ ...styles, color: 'black' }}
      >
        {context.loggedIn ? 'Welcome' : 'Sign In'}
      </h1>
    </section>
  )
}
