import { useContext } from 'react';
import { Context } from '../context/context';
import useIsMobile from '../hooks/useIsMobile';
import Button from 'antd/es/button';
import colors from '../constants/colors'

export default function Reset() {
  const { reset } = useContext(Context)
  const isMobile = useIsMobile();

  return (
    <Button
      onClick={() => reset()}
      style={{backgroundColor: colors.white}}
      size={isMobile ? "small" : "middle"}
      danger
    >
      Reset
    </Button>
  )
}
