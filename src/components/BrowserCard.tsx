import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";
import TypeBadges from "./TypeBadges";

import { FavoriteBorder, Favorite } from '@material-ui/icons';

const cardStyles = makeStyles((theme: any) => ({
	container: {
		display: "flex",
		width: "380px",
		backgroundColor: "#283E58",
		height: "150px",
		borderRadius: 32,
		position: "relative"
	},
	sprite: {
		width: "100%",
		justifyContent: "center"
	},
	link: {
		padding: "15px",
		width: "30%",
		height: "auto",
	},
	info: {
		paddingLeft: "10px"
	},
	text: {
		textAlign: "left",
		color: "#FAFAFF"
	},
	types: {
		justifyContent: "left",
		display: "flex",
		margin: "0px",
		padding: "0px"
	},
	topLine: {
		display: "grid"
	},
	heart: {
		position: "absolute",
		top:10,
		right:15,
		color: "#FFF"
	},
	heartGrid: {
		padding: "0px",
		margin: "0px"
	}
}));

export default function Pokecard(props: any) {
	const styles = cardStyles();
	const [pokemon, setPokemon] = useState({name: "Generic Pokemon", sprite: "", index: 0, prettyIndex: "000", types: ["fire"]});
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		axios.get(props.url)
		.then(res => {
			let types: string[] = []
			for (const type of res.data.types) {
				types.push(type.type.name)
			}

			let name = res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1);
			let index = ('000' + res.data.id).substr(-3)

			setPokemon({
				name: name,
				sprite: res.data.sprites.other["official-artwork"].front_default,
				prettyIndex: index,
				index: res.data.id,
				types: types
			})

			setFetching(false);
		})
	}, []);

	if (fetching) return (<CircularProgress />);

	// TODO add functionality to the favourite button
	return (
		<Card className={styles.container} variant="outlined">
			<Link className={styles.link} to={`/pokemon/${pokemon.index}`}>
				<CardMedia
					component="img"
					className={styles.sprite}
					image={pokemon.sprite}
					title={pokemon.name}
				/>
			</Link>
			<div >
				<CardContent className={styles.info}>
					<Grid container className={styles.heartGrid}>
						<Grid item xs={10} className={styles.heartGrid}>
							<Typography className={styles.text} style={{color: "#BBC1CD"}} variant="h6">
								#{pokemon.index}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<FavoriteBorder className={styles.heart} fontSize="large" />
						</Grid>
					</Grid>
					<Link style={{textDecoration: "none"}} to={`/pokemon/${pokemon.index}`}>
						<Typography className={styles.text} variant="h4" align="right">
							{pokemon.name}
						</Typography>
					</Link>
					<div className={styles.types}>
					{
						pokemon.types.map(type => {
							return (
								<TypeBadges key={type} label={type.toUpperCase()} style={{margin: 0}} />
							)
						})
					}
					</div>

				</CardContent>
			</div>
		</Card>
	)
}

//