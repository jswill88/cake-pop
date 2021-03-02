import { useContext } from 'react';
import { Context } from '../context/context';
import Button from 'antd/es/button';

export default function Reset() {
  const {
    reset,
    setPlayStatus,
    isMobile
  } = useContext(Context)

  return (
    <Button
      onClick={() => {
        reset();
        setPlayStatus('stop')
      }}
      size={isMobile ? "middle" : "small"}
      danger
    >
      Reset
    </Button>
  )
}