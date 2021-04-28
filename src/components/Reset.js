import { useContext } from 'react';
import { ScreenContext } from '../context/ScreenContext';
import Button from 'antd/es/button';
import colors from '../lib/colors'
import { useStoppingFunctions } from '../context/SongSettingsContext';

export default function Reset() {
  const { isMobile } = useContext(ScreenContext)

  const { reset } = useStoppingFunctions()

  return (
    <Button
      onClick={() => {
        reset();
      }}
      style={{backgroundColor: colors.white}}
      size={isMobile ? "small" : "middle"}
      danger
    >
      Reset
    </Button>
  )
}