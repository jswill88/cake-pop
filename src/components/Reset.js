import { useContext } from 'react';
import { Context } from '../context/context';
import Button from 'antd/es/button';
import colors from '../lib/colors'

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
      style={{backgroundColor: colors.white}}
      size={isMobile ? "small" : "middle"}
      danger
    >
      Reset
    </Button>
  )
}