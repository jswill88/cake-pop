import { createContext, useState } from 'react';

const PageContext = createContext();

function PageContextProvider ({ children }) {
  
  const [selectedMenuItem, setSelectedMenuItem] = useState('home')

  const state = {
    selectedMenuItem,
    setSelectedMenuItem
  }

  return (
    <PageContext.Provider value={state}>
      {children}
    </PageContext.Provider>
  )
}

export { PageContext }
export default PageContextProvider;
