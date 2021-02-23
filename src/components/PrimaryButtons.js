import { useContext } from 'react';
import { Context } from '../context/context';
import { Button, Space, Row } from 'antd';

import {
  CaretRightOutlined,
  BorderOutlined,
  PauseOutlined,
} from '@ant-design/icons';

export default function PrimaryButtons() {

  const {
    Tone,
    setCurrentBeat,
    tempo,
    playStatus,
    setPlayStatus,
    // stopAudio
  } = useContext(Context);

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
    Tone.Transport.stop('+0.1')
    setCurrentBeat(-2);
  }


  return (
    <Row
      justify="start"
    >
      <Space
        size="large"
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
    </Row>
  )
}

function ControlButton({ icon, callback, danger }) {
  return <Button
    size="large"
    onClick={() => callback()}
    icon={icon}
    danger={danger ? true : false}
    shape="round"
  />
}