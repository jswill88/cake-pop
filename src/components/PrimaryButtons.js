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
  const { playStatus } = useContext(Context);
  const isMobile = useIsMobile();

  return (
    <Button
      size="large"
      style={{
        lineHeight: 1,
        backgroundColor: !danger && (playStatus !== 'start' ? '#7ED957' : '#ffffff'),
        borderColor: !danger && (playStatus !== 'start' ? '#7ED957' : '#ffffff'),
      }}
      onClick={() => callback()}
      icon={icon}
      danger={danger ? true : false}
      type="primary"
      shape={isMobile ? "circle" : "round"}
    />
  )
}
