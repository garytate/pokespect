import React, { useEffect } from "react";
import "./App.css";

import "@fontsource/roboto";
import {
	Container,
	createTheme,
	ThemeProvider,
} from "@material-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Browser from "./components/Browser";
import Pokedata from "./components/Overview";
import Header from "./components/Header";
import Compare from "./components/Compare";
import Favourites from "./components/Favourites";

const theme = createTheme({
	palette: {
		primary: {
			main: "#283E58",
			light: "#00bcd4",
			dark: "#006064",
		},
		secondary: {
			main: "#ff4081",
			light: "#ff80ab",
			dark: "#f50057",
		},
	},
});

function App() {
	useEffect(() => {
		document.title = "pokespect"
 }, []);
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Header />

					<Container maxWidth="lg">
						<Switch>
							<Route exact path="/">
								<Browser />
							</Route>
							<Route path="/pokemon/:index/compare/:compare">
								<Compare />
							</Route>
							<Route path="/pokemon/:index">
								<Pokedata />
							</Route>
							<Route path="/favourites">
								<Favourites />
							</Route>
						</Switch>
					</Container>
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
