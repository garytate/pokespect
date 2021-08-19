import React from 'react';
import './App.css';

// Roboto font
import '@fontsource/roboto';
import { Container } from '@material-ui/core';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Browser from './components/browser/Browser';
import Navbar from './components/navbar/Navbar';
import Pokedata from './components/pokedata/Pokedata';
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/">
              <Browser />
            </Route>
            <Route path="/pokemon/:index">
              <Pokedata />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
