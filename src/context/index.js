import ContextProvider from './context';
import LoggedInContextProvider from './LoggedInContext/'
import SongListContextProvider from './SongListContext/'
import OpenSongContextProvider from './OpenSongContext/'
import SongSettingsContextProvider from './SongSettingsContext/'
import ToneContextProvider from './ToneContext/';

function GlobalContext({ children }) {
  return (

    <ContextProvider>
      <ToneContextProvider>
        <LoggedInContextProvider>
          <SongListContextProvider>
            <OpenSongContextProvider>
              <SongSettingsContextProvider>
                {children}
              </SongSettingsContextProvider>
            </OpenSongContextProvider>
          </SongListContextProvider>
        </LoggedInContextProvider>
      </ToneContextProvider>
    </ContextProvider>

  )
}

export default GlobalContext;