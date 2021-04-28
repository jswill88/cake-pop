import { createContext, useEffect, useState } from 'react';

import Grid from 'antd/es/grid';

const { useBreakpoint } = Grid;

export const ScreenContext = createContext();

function ScreenContextProvider(props) {

  const [screenSize, setScreenSize] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    const updatedScreens = []
    for (let key in screens) {
      if (screens[key]) updatedScreens.push(key);
    }
    setScreenSize(updatedScreens)
  }, [screens])

  useEffect(() => {
    if (screenSize.every(val => val === 'xs')) setIsMobile(true);
    else setIsMobile(false)
  }, [screenSize])

  const state = {
    screenSize,
    screens,
    isMobile,
  }

  return (
    <ScreenContext.Provider value={state}>
      {props.children}
    </ScreenContext.Provider>
  )
}
export default ScreenContextProvider;
