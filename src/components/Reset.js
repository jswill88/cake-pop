import { useContext } from 'react';
import { Context } from '../context/context';
import useIsMobile from '../hooks/useIsMobile';
import Button from 'antd/es/button';

export default function Reset() {
  const { reset } = useContext(Context);
  const isMobile = useIsMobile();

  return (
    <Button
      onClick={() => reset()}
      size={isMobile ? "small" : "middle"}
      danger
    >
      Reset
    </Button>
  )
}
