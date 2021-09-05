import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Grid,
	IconButton,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core";
import TypeBadges from "./TypeBadges";

import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { IndexFormat, NameFormat } from "../utils/StringFormat";
import { IPokemonCard } from "../types/PokecardCard";
import { fetchPokemonCard } from "../api/PokemonAPI";
import { GET_POKECARD_INFORMATION } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const cardStyles = makeStyles((theme: Theme) => ({
	container: {
		display: "flex",
		width: "380px",
		backgroundColor: "#283E58",
		height: "150px",
		borderRadius: 32,
		position: "relative",
	},
	sprite: {
		width: "100%",
		justifyContent: "center",
	},
	link: {
		padding: "15px",
		width: "30%",
		height: "auto",
	},
	info: {
		paddingLeft: "10px",
	},
	text: {
		textAlign: "left",
		color: "#FAFAFF",
	},
	types: {
		justifyContent: "left",
		display: "flex",
		margin: "0px",
		padding: "0px",
	},
	topLine: {
		display: "grid",
	},
	heart: {
		position: "absolute",
		top: 5,
		right: 10,
		color: "#FFF",
	},
	heartGrid: {
		padding: "0px",
		margin: "0px",
	},
}));

export interface BrowserCardProps {
	index: number;
}

interface PokemonInformation {
	id: number;
	name: string,
	sprite: string,
	types: any[]
  }

const Pokecard: React.FC<BrowserCardProps> = ({ index }) => {
	const styles = cardStyles();
	const [isFavourite, setIsFavourite] = useState(false);

	const {
		loading,
		data: { pokemon_v2_pokemonspecies: pokemon} = {}
	} = useQuery<any>(
		GET_POKECARD_INFORMATION,
		{
		  variables: {index: index}
		}
	)
	console.log(loading)

	const favouritePokemon = () => {
		if (!pokemon) return;

		const favList = localStorage.getItem("favourites");
		const favJSON = favList ? JSON.parse(favList) : {};

		if (isFavourite) {
			delete favJSON[pokemon.name.toLowerCase()];
		} else {
			favJSON[pokemon.name.toLowerCase()] = true;
		}

		localStorage.setItem("favourites", JSON.stringify(favJSON));
		setIsFavourite(!isFavourite);
	};

	// useEffect(() => {
	// 	fetchPokemonCard(url).then((data) => {
	// 		setPokemon(data);

	// 		const favList = localStorage.getItem("favourites");
	// 		const favJSON = favList ? JSON.parse(favList) : {};

	// 		setIsFavourite(favJSON[data.name]);
	// 	});

	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	if (loading || !pokemon) return <CircularProgress />;

	console.log(pokemon[0].name)

	return (
		<Card className={styles.container} variant="outlined">
			<Link className={styles.link} to={`/pokemon/1`}>
				<CardMedia
					component="img"
					className={styles.sprite}
					image="sprite"
					title="name"
				/>
			</Link>
			<div>
				<CardContent className={styles.info}>
					<Grid container className={styles.heartGrid}>
						<Grid item xs={10} className={styles.heartGrid}>
							<Typography
								className={styles.text}
								style={{ color: "#BBC1CD" }}
								variant="h6"
							>
								{pokemon[0].name}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<IconButton
								className={styles.heart}
								aria-label="heart"
								onClick={favouritePokemon}
							>
								{isFavourite ? (
									<Favorite fontSize="large" />
								) : (
									<FavoriteBorder fontSize="large" />
								)}
							</IconButton>
						</Grid>
					</Grid>
					<Link
						style={{ textDecoration: "none" }}
						to={`/pokemon/${1}`}
					>
						<Typography className={styles.text} variant="h4" align="right">
							name
						</Typography>
					</Link>
					<div className={styles.types}>

					</div>
				</CardContent>
			</div>
		</Card>
	);
};

export default Pokecard;


// {/*pokemon.types.map((type) => {
// 							return (
// 								<TypeBadges
// 									key={type}
// 									label={type.toUpperCase()}
// 									style={{ margin: 0 }}
// 								/>
// 							);
// 						})*/}
