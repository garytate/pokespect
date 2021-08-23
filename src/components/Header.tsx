import React from "react";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { CompareArrows, Favorite, GitHub } from "@material-ui/icons";

const useStyles = makeStyles({
	root: {
		backgroundColor: "#283E58",
		flexGrow: 0
	},
	icon: {
		color: "white"
	}
});

// TODO do the responsiveness properly
export default function Header() {
	const styles = useStyles()

	return (
		<Grid container className={styles.root} alignItems="center" justifyContent="center">
			<Grid item xs={12} sm={4}>
				<Link style={{textDecoration: "none", color: "#FAFAFF"}} to="/" >
					<h1>pokespect</h1>
				</Link>
			</Grid>
			<Grid item xs={12} sm={4}>
			<Link to="/favourites">
			<IconButton className={styles.icon} aria-label="heart" >
				<Favorite />
			</IconButton>
			</Link>
			<Link to="/pokemon/0/compare/0" >
			<IconButton className={styles.icon} aria-label="compare" >
				<CompareArrows />
			</IconButton>
			<IconButton
			onClick={() => window.open("https://github.com/garytate/pokespect")}
			className={styles.icon}
			aria-label="github"
			>
				<GitHub />
			</IconButton>
			</Link>
			</Grid>
		</Grid>
	)
}
