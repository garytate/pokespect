import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import TypeBadges from "../type-badges/TypeBadges";

const cardStyles = makeStyles((theme: any) => ({
	container: {
		display: "flex",
		width: "380px",
		backgroundColor: "#283E58",
		height: "150px",
		borderRadius: 32
	},
	sprite: {
		width: "100%",
		height: "100%"
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
	}
}));

export default function Pokecard(props: any) {
	const styles = cardStyles();
	const [pokemon, setPokemon] = useState({name: "Generic Pokemon", sprite: "", index: 0, types: ["fire"]});
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		axios.get(props.url)
		.then(res => {
			let types: string[] = []
			for (const type of res.data.types) {
				types.push(type.type.name)
			}

			setPokemon({
				name: res.data.name,
				sprite: res.data.sprites.other["official-artwork"].front_default,
				index: res.data.id,
				types: types
			})

			setFetching(false);
		})
	}, []);

	if (fetching) return (<CircularProgress />);

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
					<Typography className={styles.text} style={{color: "#BBC1CD"}} variant="h6">
						#{pokemon.index}
					</Typography>
					<Link style={{textDecoration: "none"}} to={`/pokemon/${pokemon.index}`}>
						<Typography className={styles.text} variant="h4" align="right">
							{pokemon.name}
						</Typography>
					</Link>
					<div className={styles.types}>
					{
						pokemon.types.map(type => {
							return (
								<TypeBadges key={type} label={type.toUpperCase()} />
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
