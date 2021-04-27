import ContextProvider from './context';
import LoggedInContextProvider from './loggedInContext/'
import SongListContextProvider from './songListContext/'
import OpenSongContextProvider from './openSongContext/'
import SongSettingsContextProvider from './songSettingsContext/'

function GlobalContext({ children }) {
  return (

    <ContextProvider>
      <LoggedInContextProvider>
        <SongListContextProvider>
          <OpenSongContextProvider>
            <SongSettingsContextProvider>
              {children}
            </SongSettingsContextProvider>
          </OpenSongContextProvider>
        </SongListContextProvider>
      </LoggedInContextProvider>
    </ContextProvider>

  )
}

export default GlobalContext;