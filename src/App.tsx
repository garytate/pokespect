import React from 'react';
import './App.css';

// Roboto font
import '@fontsource/roboto';
import { Container, createTheme, MuiThemeProvider } from '@material-ui/core';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Browser from './components/Browser';
import Pokedata from './components/Overview';
import Header from './components/AppHeader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAFAFF'
    },
    secondary: {
      main: '#283D58'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
