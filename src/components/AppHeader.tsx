import React from "react";
import { Grid, TextField } from "@material-ui/core";
import SearchComplete from "./SearchComplete";
// import Autocomplete from '@material-ui/lab/Autocomplete';

// TODO do the responsiveness properly
export default function Header() {

	return (
		<Grid container alignItems="center" justifyContent="center">
			<Grid item xs={12} sm={4}>
				<h1>pokespect</h1>
			</Grid>
			<Grid item xs={12} sm={4}>
				<SearchComplete />
			</Grid>
		</Grid>
	)
}
