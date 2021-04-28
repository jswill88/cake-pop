import { useContext } from 'react';
import { ToneContext } from './index';
import { useSongSettings } from '../SongSettingsContext';

function usePlayControls() {
  const {
    Tone,
    playStatus, 
    setPlayStatus,
    setCurrentBeat,
  } = useContext(ToneContext)

  const {
    cleanUp,
  } = useSongSettings()

  const pauseAudio = () => {
    Tone.Transport.pause('+8n');
    setPlayStatus('pause')
  }

  const stopAudio = () => {
    const waitTime = playStatus === 'start' ? Tone.Time("8n").toSeconds() : 0;
    if (playStatus !== 'stop') {
      Tone.Transport.stop('8n')
      setPlayStatus('stop')
    }
    setTimeout(() => {
      setCurrentBeat(-2)
      cleanUp();
    }, waitTime * 1000)
  }

  return {
    pauseAudio,
    stopAudio,
  }

}

export { usePlayControls }