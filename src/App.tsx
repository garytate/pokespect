import React from "react";

import "@fontsource/roboto";
import {
	Container,
	createTheme,
	makeStyles,
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

const useStyles = makeStyles({
	app: {
		backgroundColor: "#f4f3ee",
		textAlign: "center",
		color: "#283e58",
		minHeight: "100vh",
		display: "flex",
		flexFlow: "column",
	},
	container: {
		backgroundColor: "#fbfaf5",
		flexGrow: 1,
	},
});

function App() {
	const styles = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className={styles.app}>
					<Header />

					<Container className={styles.container} maxWidth="lg">
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
