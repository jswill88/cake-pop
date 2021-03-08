import React from 'react';
import ReactDOM from 'react-dom';
import ContextProvider from './context/context';
import { CookiesProvider } from 'react-cookie';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
