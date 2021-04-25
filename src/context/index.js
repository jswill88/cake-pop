import ContextProvider from './context';
import LoggedInContextProvider from './loggedInContext/'
import SongListContextProvider from './songListContext/'

function GlobalContext({ children }) {
  return (

      <ContextProvider>
        <LoggedInContextProvider>
          <SongListContextProvider>
            {children}
          </SongListContextProvider>
        </LoggedInContextProvider>
      </ContextProvider>

  )
}

export default GlobalContext;