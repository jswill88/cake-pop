import { useState, useContext } from 'react';
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
  } = useContext(Context);

  const [playStatus, setPlayStatus] = useState('stop');

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

  return (
    <Row
      justify="center"
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
        {/* <h1
        onClick={() => {
          reset();
          setPlayStatus('stop')
        }}
        style={{ ...styles, color: 'orange' }}
      >Reset</h1> */}
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