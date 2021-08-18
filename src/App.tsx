import React from 'react';
import logo from './logo.svg';
import './App.css';

// temporary for testing
import Browser from './components/browser/Browser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>pokestop</p>

        <Browser />
      </header>
    </div>
  );
}

export default App;
