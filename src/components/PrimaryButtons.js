import { useState } from 'react';

export default function PrimaryButtons({ Tone, setCurrentBeat, tempo }) {

  const [playStatus, setPlayStatus] = useState('stop')

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
      {['pause','stop'].includes(playStatus) ?
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
    </section>
  )
}
