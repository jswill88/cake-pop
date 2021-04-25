import { createContext, useState, useContext } from 'react';

const SongListContext = createContext();

function useSongList() {
  const context = useContext(SongListContext);
  return context;
}

function SongListContextProvider({children}) {
  const [songs, setSongs] = useState([])
  const state = {
    songs,
    setSongs
  }
  return (
    <SongListContext.Provider value={state}>
      {children}
    </SongListContext.Provider>
  )
}

export { useSongList } 

export { SongListContext }

export default SongListContextProvider;
