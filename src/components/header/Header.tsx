import React from "react";
import { Container, Grid, TextField } from "@material-ui/core";
// import Autocomplete from '@material-ui/lab/Autocomplete';

// TODO do the responsiveness properly
export default function Header() {

	return (
		<Grid container alignItems="center" justify="center">
			<Grid item xs={4}>
			</Grid>
			<Grid item xs={2}>
				<h1>pokespect</h1>
			</Grid>
			<Grid item xs={2}>
				<TextField label="Search the pokedex..." variant="outlined" size="small" />
			</Grid>
			<Grid item xs={4}>
			</Grid>
		</Grid>
	)
}
