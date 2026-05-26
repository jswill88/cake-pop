import { useContext } from 'react';
import { MobileContext } from '../context/mobileContext';

export default function useIsMobile() {
  const isMobile = useContext(MobileContext);

  if (isMobile === undefined) {
    throw new Error('useIsMobile must be used within MobileProvider');
  }

  return isMobile;
}
