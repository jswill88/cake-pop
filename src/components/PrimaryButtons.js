import { useContext, useState } from 'react';
import { Context } from '../context/context';
import { Button, Space, Row } from 'antd';

import {
  CaretRightOutlined,
  BorderOutlined,
  PauseOutlined,
} from '@ant-design/icons';

export default function PrimaryButtons() {

  const [toneContext, setToneContext] = useState(null)
  const [started, setStarted] = useState(false)

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
    // if(!started) {
      // const toneContext = new Tone.Context({ latencyHint : "interactive" })
      // Tone.setContext(toneContext)
      // setStarted(true)
    // }
    await Tone.start();
    // toneContext.resume();
    Tone.Transport.bpm.value = tempo;
    Tone.Transport.start('+0.1');
    // setToneContext(toneContext)
  }

  const pauseAudio = () => {
    Tone.Transport.pause('+0.1');
    setPlayStatus('pause')
  }

  const stopAudio = () => {
    Tone.Transport.stop('+0.1')
    setPlayStatus('stop')
    setCurrentBeat(-2);
    // toneContext.dispose();
    // toneContext.close();
    // setToneContext(null)
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