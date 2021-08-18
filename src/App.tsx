import React from 'react';
import logo from './logo.svg';
import './App.css';

import Browser from './components/browser/Browser';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Browser />
    </div>
  );
}

export default App;
