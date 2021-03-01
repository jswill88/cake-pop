import { useContext } from 'react';
import { Context } from '../context/context';
import Button from 'antd/es/button';

export default function Reset() {
  const {
    reset,
    setPlayStatus
  } = useContext(Context)

  return (
    <Button
      onClick={() => {
        reset();
        setPlayStatus('stop')
      }}
      size="small"
      danger
    >
      Reset
    </Button>
  )
}