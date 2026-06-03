import { useContext } from 'react';
import { Context } from '../context/context';
import useIsMobile from '../hooks/useIsMobile';
import { startAudio as start, pauseAudio as pause } from '../audio';

import Button from 'antd/es/button';
import Space from 'antd/es/space';

import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import PauseOutlined from '@ant-design/icons/PauseOutlined';

export default function PrimaryButtons() {

  const {
    tempo,
    playStatus,
    setPlayStatus,
    stopAudio
  } = useContext(Context);
  const isMobile = useIsMobile();

  const startAudio = async () => {
    setPlayStatus('start');
    start(tempo);
  }

  const pauseAudio = () => {
    pause();
    setPlayStatus('pause');
  }

  return (
      <Space
        size={isMobile ? "small" : "large"}
      >
        {['pause', 'stop'].includes(playStatus) ?
          <ControlButton
            callback={startAudio}
            icon={<CaretRightOutlined aria-hidden />}
            color="green"
            label="play"
          />
          :
          <ControlButton
            callback={pauseAudio}
            icon={<PauseOutlined aria-hidden />}
            color="white"
            label="pause"
          />
        }
        <ControlButton
          callback={stopAudio}
          icon={<BorderOutlined aria-hidden />}
          color="red"
          label="stop"
        />
      </Space>
  )
}

function ControlButton({ icon, callback, color, label }) {
  const isMobile = useIsMobile();

  return (
    <Button
      size="large"
      onClick={() => callback()}
      icon={icon}
      color={"pink"}
      variant="outlined"
      aria-label={label}
      shape={isMobile ? "circle" : "round"}
    />
  )
}
