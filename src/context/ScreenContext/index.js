import { createContext, useEffect, useState } from 'react';

import Grid from 'antd/es/grid';

const { useBreakpoint } = Grid;

export const ScreenContext = createContext();

function ScreenContextProvider(props) {

  const [screenSize, setScreenSize] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    
    const updatedScreens = Object.keys(screens).filter(key => screens[key])

    setScreenSize(updatedScreens)

  }, [screens])

  useEffect(() => {
    if (screenSize.every(val => val === 'xs')) setIsMobile(true);
    else setIsMobile(false)
  }, [screenSize])

  const state = {
    screenSize,
    isMobile,
  }

  return (
    <ScreenContext.Provider value={state}>
      {props.children}
    </ScreenContext.Provider>
  )
}
export default ScreenContextProvider;
