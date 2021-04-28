import { useContext } from 'react';
import { minTempo, maxTempo, extraTime } from '../../lib/constants';
import { useSongSettings } from '../SongSettingsContext';
import { ToneContext } from './index'

function useTone() {
  const {
    tempo,
    setTempo,
    synths,
    playStatus,
    setPlayStatus,
    setCurrentBeat,
    Tone
  } = useContext(ToneContext)

  const {
    setNoteSwitches,
    loopLength,
    buttons,
    loopDraw,
  } = useSongSettings()

  const handleTempoChange = newTempo => {
    const tempo = newTempo < minTempo ? minTempo : Math.min(maxTempo, newTempo)
    Tone.Transport.bpm.rampTo(tempo, 1);
    setTempo(tempo)
  }

  const startAudio = async () => {
    if (playStatus === 'stop') {
      setCurrentBeat(-1)
      makeLoops()
    }
    setPlayStatus('start')

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.start('+0.1');
  }

  const makeLoops = () => {

    const noteObj = {};

    ['high', 'mid', 'low', 'bassHigh', 'bassLow', 'cymbal', 'snareDrum', 'bassDrum'].forEach(row => {
      let type;
      if (['bassHigh', 'bassLow'].includes(row)) type = 'bassSynth'
      else if (['high', 'mid', 'low'].includes(row)) type = 'chordSynth'
      else type = row;

      const synth = synths[row];

      noteObj[row] = new Tone.Sequence((time, note) => {
        if (type === 'snareDrum') synth.triggerAttackRelease('16n', time + extraTime)
        else synth.triggerAttackRelease(note, '8n', time + extraTime)
      }, buttons[row].map(note => note ? [note] : [])).start(0);
    })

    setNoteSwitches(noteObj)

    const arrOfIdx = new Array(loopLength).fill(0).map((_, i) => i);
    loopDraw.current = new Tone.Sequence((time, note) => {
      Tone.Draw.schedule(() => {
        setCurrentBeat(note)
      }, time)
    }, arrOfIdx).start(0);
  }

  return {
    tempo,
    setTempo,
    handleTempoChange,
    startAudio,
  }
}

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

export { useTone, usePlayControls }