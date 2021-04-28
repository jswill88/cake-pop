import { useContext } from 'react';
import { Context } from '../context/context';

import Button from 'antd/es/button';
import Space from 'antd/es/space';

import CaretRightOutlined from '@ant-design/icons/CaretRightOutlined';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import PauseOutlined from '@ant-design/icons/PauseOutlined';
import { ToneContext, usePlayControls, useTone } from '../context/ToneContext';


export default function PrimaryButtons() {

  const { isMobile } = useContext(Context);

  const { playStatus } = useContext(ToneContext)

  const { startAudio } = useTone();

  const {
    pauseAudio,
    stopAudio,
  } = usePlayControls()

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
  const { isMobile } = useContext(Context);

  const { playStatus } = useContext(ToneContext)
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