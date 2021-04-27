import { useState } from 'react';
import { useOpenSong, OpenSongContext } from './useOpenSong'

function OpenSongContextProvider({ children }) {
  const [openSongId, setOpenSongId] = useState(false);
  const [title, setTitle] = useState('New Song')

  const state = {
    openSongId,
    setOpenSongId,
    title,
    setTitle
  }
  return (
    <OpenSongContext.Provider value={state}>
      {children}
    </OpenSongContext.Provider>
  )
}

export { useOpenSong };
export { OpenSongContext };
export default OpenSongContextProvider;