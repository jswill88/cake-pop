import ScreenContextProvider from './ScreenContext';
import LoggedInContextProvider from './LoggedInContext/'
import SongListContextProvider from './SongListContext/'
import OpenSongContextProvider from './OpenSongContext/'
import SongSettingsContextProvider from './SongSettingsContext/'
import ToneContextProvider from './ToneContext/';
import PageContextProvider from './PageContext/';

function GlobalContext({ children }) {
  return (

    <ScreenContextProvider>
      <ToneContextProvider>
        <LoggedInContextProvider>
          <SongListContextProvider>
            <OpenSongContextProvider>
              <SongSettingsContextProvider>
                <PageContextProvider>
                  {children}
                </PageContextProvider>
              </SongSettingsContextProvider>
            </OpenSongContextProvider>
          </SongListContextProvider>
        </LoggedInContextProvider>
      </ToneContextProvider>
    </ScreenContextProvider>

  )
}

export default GlobalContext;