import { useContext } from 'react';
import { Context } from '../context/context';

import Button from 'antd/es/button';
import Space from 'antd/es/space';

import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import PauseOutlined from '@ant-design/icons/PauseOutlined';

export default function PrimaryButtons() {

  const {
    Tone,
    setCurrentBeat,
    tempo,
    playStatus,
    setPlayStatus,
    stopAudio,
    isMobile,
    makeLoops
  } = useContext(Context);

  const startAudio = async () => {
    if (playStatus === 'stop') {
      setCurrentBeat(-1)
      makeLoops()
    }
    setPlayStatus('start')

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.start('+0.1');
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