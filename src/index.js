import React from 'react';
import ReactDOM from 'react-dom';
import ContextProvider from './context/context';
import MobileProvider from './context/mobileContext';
import { CookiesProvider } from 'react-cookie';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <ContextProvider>
        <MobileProvider>
          <App />
        </MobileProvider>
      </ContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
