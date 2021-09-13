import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { GlobalStyle } from './styles/global';

function App() {
  return (
      <>
        <GlobalStyle/>
        <Header/>
        <Dashboard/>
      </>
  );
}

export default App;
