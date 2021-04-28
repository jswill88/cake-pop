import ScreenContextProvider from './ScreenContext';
import LoggedInContextProvider from './LoggedInContext/'
import SongListContextProvider from './SongListContext/'
import OpenSongContextProvider from './OpenSongContext/'
import SongSettingsContextProvider from './SongSettingsContext/'
import ToneContextProvider from './ToneContext/';
import PageContextProvider from './PageContext/';

function GlobalContext({ children }) {
  return (

    <ToneContextProvider>
      <SongSettingsContextProvider>
        <LoggedInContextProvider>
          <SongListContextProvider>
            <OpenSongContextProvider>
              <PageContextProvider>
                <ScreenContextProvider>
                  {children}
                </ScreenContextProvider>
              </PageContextProvider>
            </OpenSongContextProvider>
          </SongListContextProvider>
        </LoggedInContextProvider>
      </SongSettingsContextProvider>
    </ToneContextProvider>

  )
}

export default GlobalContext;