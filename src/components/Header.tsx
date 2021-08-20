import React from "react";
import { Grid, TextField } from "@material-ui/core";
import SearchComplete from "./HeaderSearch";
import { Link } from "react-router-dom";
// import Autocomplete from '@material-ui/lab/Autocomplete';

// TODO do the responsiveness properly
export default function Header() {

	return (
		<Grid container alignItems="center" justifyContent="center">
			<Grid item xs={12} sm={4}>
				<Link style={{textDecoration: "none", color: "#FAFAFF"}} to="/" >
					<h1>pokespect</h1>
				</Link>
			</Grid>
			<Grid item xs={12} sm={4}>
				<SearchComplete />
			</Grid>
		</Grid>
	)
}
