import { useContext } from 'react';
import { Context, extraTime } from '../context/context';

import Button from 'antd/es/button';
import Space from 'antd/es/space';

import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import PauseOutlined from '@ant-design/icons/PauseOutlined';
import { SongSettingsContext } from '../context/songSettingsContext';

export default function PrimaryButtons() {

  const {
    Tone,
    setCurrentBeat,
    tempo,
    playStatus,
    setPlayStatus,
    stopAudio,
    isMobile,
    synths,
    loopDraw
    // makeLoops
  } = useContext(Context);

  const { setNoteSwitches, loopLength, buttons } = useContext(SongSettingsContext)

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

  const pauseAudio = () => {
    Tone.Transport.pause('+8n');
    setPlayStatus('pause')
  }

  return (
      <Space
        size={isMobile ? "small" : "large"}
      >
        {['pause', 'stop'].includes(playStatus) ?
          <ControlButton
            callback={startAudio}
            icon={<CaretRightOutlined />}
          />
          :

          <ControlButton
            callback={pauseAudio}
            icon={<PauseOutlined />}
          />
        }
        <ControlButton
            callback={stopAudio}
            icon={<BorderOutlined />}
            danger={true}
          />
      </Space>
  )
}

function ControlButton({ icon, callback, danger }) {
  const { isMobile, playStatus } = useContext(Context);
  return <Button
    size="large"
    style={{lineHeight: 1,
      backgroundColor: !danger && (playStatus !== 'start' ? '#7ED957' : '#ffffff'),
      borderColor: !danger && (playStatus !== 'start' ? '#7ED957' : '#ffffff'),
      
  }}
    onClick={() => callback()}
    icon={icon}
    danger={danger ? true : false}
    type="primary"
    
    shape={isMobile ? "circle" : "round"}
  />
}