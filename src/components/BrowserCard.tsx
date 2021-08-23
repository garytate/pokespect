import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import TypeBadges from "./TypeBadges";

import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { NameFormat, IndexFormat } from "../utils/StringFormat";
import { PokemonCard } from "../types/PokecardCard";

const cardStyles = makeStyles((theme: Theme) => ({
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
		top:5,
		right:10,
		color: "#FFF"
	},
	heartGrid: {
		padding: "0px",
		margin: "0px"
	}
}));

export interface Props {
	url: string
}

const Pokecard: React.FC<Props> = ({ url }) => {
	const styles = cardStyles();
	const [pokemon, setPokemon] = useState<PokemonCard>();
	const [fetching, setFetching] = useState(true);
	const [isFavourite, setIsFavourite] = useState(false);

	const favouritePokemon = () => {
		if (!pokemon) return;

		const favList = localStorage.getItem("favourites");
		const favJSON = favList ? JSON.parse(favList) : {}

		if (isFavourite) {
			delete favJSON[pokemon.name.toLowerCase()];
		} else {
			favJSON[pokemon.name.toLowerCase()] = true;
		}

		localStorage.setItem("favourites", JSON.stringify(favJSON))
		setIsFavourite(!isFavourite)
	}

	useEffect(() => {
		axios.get(url)
		.then(res => {
			let { name, id, sprites, types } = res.data;

			types = types.map((type: any) => type.type.name);
			name = NameFormat(name);

			setPokemon({
				name: name,
				sprite: sprites.other["official-artwork"].front_default,
				index: id,
				types: types
			})

			setFetching(false);

			const favList = localStorage.getItem("favourites");
			const favJSON = favList ? JSON.parse(favList) : {}

			setIsFavourite(favJSON[res.data.name])
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (fetching || !pokemon) return (<CircularProgress />);

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
								#{IndexFormat(pokemon.index)}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<IconButton className={styles.heart} aria-label="heart" onClick={favouritePokemon}>
								{isFavourite
								? <Favorite fontSize="large" />
								: <FavoriteBorder fontSize="large" />
								}
							</IconButton>
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

export default Pokecard;
