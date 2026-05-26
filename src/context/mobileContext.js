import { createContext, useMemo } from 'react';
import Grid from 'antd/es/grid';

const { useBreakpoint } = Grid;

export const MobileContext = createContext();

export default function MobileProvider({ children }) {
  const screens = useBreakpoint();

  const isMobile = useMemo(() => (
    Object.entries(screens).reduce(
      (acc, [size, bool]) => (size === 'xs' || !bool) && acc,
      true
    )
  ), [screens]);

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  );
}
